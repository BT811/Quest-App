import React from "react";
import { Link,useNavigate} from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();
     
    const onClick=()=>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Quest App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">{localStorage.getItem("currentUser") !== null?
                             <Link className="nav-link" to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link> :""
                            }
                               
                            </li>
                            <li class="nav-item justify-content-end ">
                                {localStorage.getItem("currentUser") !== null ?
                                    <Link className="nav-link   " to={{pathname: "/auth"}} onClick={onClick}>Log out</Link>
                                    :
                                    <Link className="nav-link ml-auto" to={{pathname: "/auth"}} >Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;