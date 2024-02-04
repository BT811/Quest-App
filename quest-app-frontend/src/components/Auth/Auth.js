import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";


function Auth() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


    const handleUserName = (value) => {
        setUserName(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const navigate = useNavigate();

    const handleButton = async (path) => {       
    
           sendRequest(path);
       
        if (localStorage.getItem('currentUser') !== null && path !== "register") {
            navigate('/');
        } else {
            navigate('/auth');
        }
        
          
    }


    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/" + path),
            {
                userName: userName,
                password: password,
            })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("userName", userName);
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
            })
            .catch((err) => console.log(err))

        /* fetch("/auth/"+path, {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({
               userName: userName,
               password: password,
           }),
       }).then((res) => res.json())
           .then((result) => {
               localStorage.setItem("userName", userName);
               localStorage.setItem("tokenKey", result.message);
               localStorage.setItem("currentUser", result.userId)
               localStorage.setItem("refreshKey",result.refreshToken);
           })
           .catch((err) => console.log(err))*/

    }


    return (
        <div class="container mt-4" >
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card-group mb-0">
                        <div class="card p-4">
                            <div class="card-body">
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <div class="input-group mb-3">
                                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                    <input type="text" class="form-control" placeholder="UserName" onChange={(i) => handleUserName(i.target.value)} />
                                </div>
                                <div class="input-group mb-4">
                                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                    <input type="password" class="form-control" placeholder="Password" onChange={(i) => handlePassword(i.target.value)} />
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-primary px-4" onClick={() => handleButton("login")}>Login</button>
                                    </div>
                                    <div class="col-6 text-right">
                                        <button type="button" class="btn btn-link px-0">Forgot password?</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card text-white bg-primary py-5 d-md-down-none" style={{ width: 44 }}>
                            <div class="card-body text-center">
                                <div>
                                    <h2>Sign up</h2>
                                    <h1>QUEST-APP</h1>
                                    <button type="button" class="btn btn-primary active mt-3" onClick={() => handleButton("register")}>Register Now!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Auth;