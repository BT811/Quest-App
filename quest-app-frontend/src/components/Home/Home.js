import React from "react";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import PostForm from "../Post/PostForm";


function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);


    const refleshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refleshPosts();
    }, [])

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                {localStorage.getItem("currentUser") == null ?
                    "" :
                    <>
                        <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refleshPosts={refleshPosts} />
                    </>
                }
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                        title={post.title} text={post.text}></Post>
                ))}
            </div>
        );
    }

}
export default Home;