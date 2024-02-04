import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PutWithAuth,RefreshKToken } from "../../services/HttpService";

export default function Avatar(props) {
    const { avatarId, userId ,userName} = props;
    const [selectedValue, setSelectedValue] = useState(avatarId);
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        localStorage.removeItem("refreshKey")
        navigate('/auth');
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        
    }
    const handleClose = () =>{
        saveAvatar();
    }

    const saveAvatar = () => {
        
        PutWithAuth("/users/"+localStorage.getItem("currentUser"), {
            avatar: selectedValue,
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

                            saveAvatar();
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
          

        /*fetch("/user/"+localStorage.getItem("currentUser"),{
            method : "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                avatar: selectedValue,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))*/
    }

    return (
        <div className="d-flex justify-content-start" style={{ float: "left" }} >
            <div class=" card m-4 p-4" style={{ width: "18rem" }}>
                <div>
                    <img class="card-img-top" src={`/avatars/avatar${selectedValue}.png`} alt="Card image cap" />
                </div>

                <div class="card-body">
                    <h5 class="card-title">{userName}</h5>
                    <p class="card-text"></p>

                    {localStorage.getItem("currentUser") == userId ? <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Change Avatar
                    </button>:"" }
                    

                    <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog  modal-dialog-centered ">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Select Avatar</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                                </div>

                                <div class="d-flex justify-content-between mb-4 mt-4">
                                    <div class="position-relative ">
                                        <img class="avatar img-fluid" src="/avatars/avatar1.png" alt="Boy Avatar" />
                                        <div class="form-check position-absolute bottom-20 start-50 translate-middle-x">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={1} onChange={(i) => handleChange(i)} />
                                        </div>
                                    </div>
                                    <div class="position-relative">
                                        <img class="avatar img-fluid" src="/avatars/avatar2.png" alt="Woman 1 Avatar" />
                                        <div class="form-check position-absolute bottom-20 start-50 translate-middle-x">
                                            <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={2} onChange={(i) => handleChange(i)} />
                                        </div>

                                    </div>
                                    <div class="position-relative">
                                        <img class="avatar img-fluid" src="/avatars/avatar3.png" alt="Woman Avatar" />
                                        <div class="form-check position-absolute bottom-20 start-50 translate-middle-x">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value={3} onChange={(i) => handleChange(i)} />
                                        </div>
                                    </div>
                                    <div class="position-relative">
                                        <img class="avatar img-fluid" src="/avatars/avatar4.png" alt="Woman Avatar" />
                                        <div class="form-check position-absolute bottom-20 start-50 translate-middle-x">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value={4} onChange={(i) => handleChange(i)} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}