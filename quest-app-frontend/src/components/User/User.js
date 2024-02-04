import {React, useState, useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { GetWithAuth ,RefreshKToken} from "../../services/HttpService";

function User() {
    const { userId } = useParams();
    const [user,setUser] = useState();
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        navigate('/auth');
    }

    
    const getUser = () =>{
       GetWithAuth("/users/"+userId).then((res) => {
        if (!res.ok) {
            RefreshKToken().then((res) => {
                if (!res.ok) {
                    logout();
                } else {
                   return res.json()
                }
            })
                .then((result) => {
                    if (result != undefined) {
                        localStorage.setItem("tokenKey", result.accessToken);

                       getUser();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else
            return res.json();
    }).then(
        (result)=> {
            console.log(result);
            setUser(result);
        },
        (error) => {
            console.log(error)
        }
    )

   
       /*.then(res => res.json())
        .then(
            (result)=> {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )*/
      /* 
        fetch("/users/"+userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
        .then(res => res.json())
        .then(
            (result)=> {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )*/  
    }
    useEffect(() => {
            getUser();
        }, [])
    return(
        <div> 
            <div>
                 {user ? <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName}/> : ""}
                 {localStorage.getItem("currentUser") === userId ?  <UserActivity userId={userId}/>:""}
            </div>
           
        </div>
    );

}
export default User;