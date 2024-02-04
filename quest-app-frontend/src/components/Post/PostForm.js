import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostWithAuth ,RefreshKToken} from "../../services/HttpService";

function PostForm(props) {
    const { userId, userName, refleshPosts } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSend, setIsSend] = useState(false);
    let navigate = useNavigate();
     const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        navigate('/auth');
    }

    const savePost = () => {

        PostWithAuth("/posts", {
            title: title,
            userId: userId,
            text: text,
        }).then((res) => {
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
    
                           savePost();
                           refleshPosts();
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else
                return res.json();
        })
            .catch((err) => {
                console.log(err)
            })


         /*fetch("/posts",
             {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization" : localStorage.getItem("tokenKey"),
                 },
                 body: JSON.stringify({
                     title: title,
                     userId: userId,
                     text: text,
                 }),
             })
             .then((res) => res.json())
             .catch((err) => console.log("error"))*/

    }

    const handleSubmit = () => {
        savePost();
        setIsSend(true);
        setTimeout(function () {
            document.getElementById("alert").style.display = "none";
        }, 2000);
        setTitle("");
        setText("");
        refleshPosts();

    }
    const handleTitle = (value) => {
        setTitle(value);
        setIsSend(false);
    }
    const handleText = (value) => {
        setText(value);
        setIsSend(false);
    }


    return (
        <div>
            {isSend && (

                <div id="alert" class="alert alert-success" role="alert">
                    <strong>Success!</strong> Post is sended.
                </div>
            )}

            <div class="container my-2 py-2">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-10 col-xl-8">
                        <div class="card" >
                            <div class="card-body p-4">

                                <div class="d-flex flex-start">

                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>

                                            <div class="d-flex justify-content-between align-items-center">

                                                <div class="d-flex justify-content-start align-items-center "
                                                    style={{ backgroundcolor: "#D3D3D3" }}
                                                >
                                                    <div className="rounded-circle shadow-1-strong me-3" style={{
                                                        width: "62px",
                                                        height: "60px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#007bff",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: "white",
                                                        fontSize: "30px",
                                                        textDecoration: "none"
                                                    }}
                                                        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '1px 1px 1px #888888')}
                                                        onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}>
                                                        {userName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div class="form-outline " style={{ width: 300 }}>
                                                        <input
                                                            class="form-control"
                                                            id="title"
                                                            style={{ background: "#fff" }}
                                                            maxLength="20"
                                                            placeholder="Title"
                                                            onChange={(i) => handleTitle(i.target.value)}
                                                            value={title}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="small mb-0" style={{ textAlign: "left" }} >

                                                <div class="card-footer py-3 border-0" >
                                                    <div class="d-flex flex-start w-100">
                                                        <div class="form-outline w-100">
                                                            <textarea class="form-control" id="textAreaExample" rows="4"
                                                                maxLength={200}
                                                                onChange={(i) => handleText(i.target.value)}
                                                                value={text}
                                                            ></textarea>
                                                            <label class="form-label" for="textAreaExample"></label>
                                                        </div>
                                                    </div>
                                                    <div class="float-end mt-2 pt-1">
                                                        <button type="button" class="btn btn-primary btn-sm" onClick={handleSubmit} >Post comment</button>
                                                        <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                                                    </div>
                                                </div>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
            </div>

        </div >
    );


}

export default PostForm;