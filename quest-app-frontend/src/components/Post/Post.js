import React, { useRef, useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { DeleteWithAuth, PostWithAuth ,RefreshKToken} from "../../services/HttpService";

function Post(props) {
    const { likes, postId, title, text, userName, userId } = props;
    const [showComment, setShowComment] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikedId] = useState(null);
    const disabled = localStorage.getItem("currentUser") == null ? true : false ;
    const [reflesh,setReflesh] = useState(false);
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        navigate('/auth');
    }

    const setCommentReflesh = () =>{
        setReflesh(true);
    }

    const checkLikes = () => {
        var likeControl = likes.find(like => ""+like.userId === localStorage.getItem("currentUser"));
        if (likeControl != null) {
            setLikedId(likeControl.id);
            setIsLiked(true);
        }

    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            setLikeCount(likeCount + 1);
            saveLike();
        }
        else {
            setLikeCount(likeCount - 1);
            deleteLike();
        }


    };

    const saveLike = () => {
        PostWithAuth("/likes",{
            postId: postId,
            userId: localStorage.getItem("currentUser"),
        })
        .then((res) => {
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

                            saveLike();
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
        /*
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser"),
            }),
        })
            .then((res) => res.json())
            .catch((res) => console.log(res))
            */
    }

   
   const deleteLike = () => {
     DeleteWithAuth("/likes/" + likeId).then((res) => {
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

                        deleteLike();
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else;
           return  res.json();
    })
        .catch((err) => {
            console.log(err)
        })
       /*  fetch("/likes/" + likeId, {
            method: "DELETE",
            headers:{
                "Authorization" : localStorage.getItem("tokenKey"),
            },

        }).catch((res) => console.log(res))*/
    }



    const refleshComments = () => {
        
        fetch("/comments?postId="+postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

            setReflesh(false)
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else
            refleshComments();
    }, [reflesh])

    useEffect(() => {
        checkLikes();
    }, [])


    return (
        <div>
            <div class="gradient-custom">
                <div class="container my-2 py-2">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-12 col-lg-10 col-xl-8">
                            <div class="card">
                                <div class="card-body p-4">

                                    <div class="row">
                                        <div class="col">

                                            <div class="d-flex flex-start">
                                                <Link className="avatar-link" to={{ pathname: '/users/' + userId }}>
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
                                                </Link>

                                                <div class="flex-grow-1 flex-shrink-1">
                                                    <div>

                                                        <div class="d-flex justify-content-between align-items-center">

                                                            <p class="mb-1">
                                                                {title}
                                                            </p>
                                                            <a href="#!"><i class="fas fa-reply fa-xs"></i><span class="small"> delete -not work yet-  </span></a>
                                                        </div>
                                                        <p class="small mb-0" style={{ textAlign: "left" }} >
                                                            {text}
                                                        </p>
                                                    </div>


                                                    <button
                                                        type="button"
                                                        className={`btn`}
                                                        disabled = {disabled}
                                                        onClick={handleLike}
                                                        style={{ height: 20, width: 20, padding: 8, margin: 8, outline: 'none', boxShadow: "none", float: "right", borer: 'none', background: 'transparent' }}

                                                    >
                                                        {!isLiked ? <div style={{ background: 'transparent' }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"
                                                            >
                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                                <text x="5" y="12" fontSize="12" fill="black"
                                                                    fontFamily="Open Sans">
                                                                    {likeCount}
                                                                </text>
                                                            </svg></div>
                                                            :
                                                            <div style={{ background: 'transparent' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"
                                                                    style={{ color: "red" }}>
                                                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                                    <text x="5" y="12" fontSize="12" fill="white"
                                                                        fontFamily="Open Sans">
                                                                        {likeCount}
                                                                    </text>
                                                                </svg>

                                                            </div>
                                                        }



                                                    </button>




                                                    <div className="d-flex flex-start mt-4">
                                                        <div className="flex-grow-1 flex-shrink-1">
                                                            <div>

                                                                <div className="d-flex justify-content-between align-items-center" style={{ outline: 'none', boxShadow: "none" }}>
                                                                    <button className="btn btn-primary" onClick={() => { setShowComment(!showComment); refleshComments(); }}
                                                                        style={{
                                                                            boxShadow: 'none',
                                                                            transition: 'box-shadow 0.3s',
                                                                            cursor: 'pointer',
                                                                            outline: 'none'
                                                                        }}
                                                                        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '3px 3px 3px #888888')}
                                                                        onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}

                                                                    >

                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                                        </svg>
                                                                    </button>


                                                                </div>
                                                                {showComment && (
                                                                    <div>
                                                                        {commentList.map(comment => (
                                                                            <Comment userId={comment.userId}  text={comment.text} userName={comment.userName}>
                                                                            </Comment>

                                                                        ))}
                                                                        {disabled?
                                                                            ""
                                                                            : <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentReflesh={setCommentReflesh}></CommentForm>

                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default Post;