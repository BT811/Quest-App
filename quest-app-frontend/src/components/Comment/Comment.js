import React from "react";
import { Link } from "react-router-dom";

function Comment(props) {
    const { text, userId, userName } = props

    return (
        <div class="d-flex flex-start mt-4">
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
                            {userName}
                        </p>
                    </div>
                    <p class="small mb-0">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Comment;