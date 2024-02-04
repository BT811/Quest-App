import React, { useState } from "react";
import { PostWithAuth, RefreshKToken } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";


function CommentForm(props) {
    const { userId, userName, postId, setCommentReflesh } = props
    const [text, setText] = useState("");
    const [isSend, setIsSend] = useState(false);
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")

        navigate('/auth');

    }

    const saveComment = () => {
        PostWithAuth("/comments", {
            postId: postId,
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
                            
                            saveComment();
                            setCommentReflesh();
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else
                res.json()
        })
            .catch((err) => {
                console.log(err)
            })

        /*fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : localStorage.getItem("tokenKey"),
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))*/
    }

    const handleSubmit = () => {
        saveComment();
        setCommentReflesh();
        setIsSend(true);
        setText("");

    }

    const handleText = (value) => {
        setText(value);
        setIsSend(false);
    }

    return (
        <div class="card-footer py-3 border-0 mt-2" >
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
                <button type="button" class="btn btn-primary btn-sm" onClick={handleSubmit} >Send</button>
                <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
            </div>
        </div>
    );
}
export default CommentForm;