
import { useEffect, useState } from "react";
import { GetWithAuth , RefreshKToken } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";


export default function UserActivity(props) {
    const { userId } = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        navigate('/auth');
    }
    const getActivity = () => {
        GetWithAuth("/users/activity/"+userId)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log(result);
                setRows(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            }
        )


        /*.then((res) => {
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
    
                           getActivity();
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else
               return res.json();
        }).then(
            (result) => {
                setIsLoaded(true);
                console.log(result);
                setRows(result)
            },
            (error) => {
                console.log(error)
                setIsLoaded(true);
                setError(error);
            })
        */

        /*fetch("/user/activity/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
        }).then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                console.log(result);
                
                setRows(result);
            })
            .catch(error => {
                console.log(error);
                setIsLoaded(true);
                setError(error);
            })*/
    }

    useEffect(() => {
        getActivity()
    }, []);

    const handleNotification = (postId) => {


    }
    function ShowPost() {
        return (
            <div>
                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                               /Post/
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
                            </div>
                        </div>
                    </div>
                </div>     
                <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a>
            </div>
        );
    }

    return (
        <div className="row justify-content-end" >
            <div class="container py-5 " >
                <div class="row">
                    <div class="col-lg-7 mx-auto bg-white rounded shadow">


                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th scope="col" class="col-3">User Activity</th>

                                    </tr>
                                </thead>
                                <tbody>


                                    {rows.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <button onClick={() => handleNotification(row[1])}>
                                                        {row[3] + " " + row[0] + " your post."}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}


                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}