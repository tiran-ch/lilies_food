import React, {useEffect, useState} from "react";
import "./Register.css";
import { getAuth, createUserWithEmailAndPassword, } from "firebase/auth";
import app from "../../fireabase/Firebase";
import { db } from "../../fireabase/Firebase";
import {useFetcher, useNavigate} from "react-router-dom";
import { doc, setDoc, collection } from "firebase/firestore";


export default function Register() {
    const navigate = useNavigate();
    const [show, UseShow] = useState("show");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [userFullName, setUserFullName] = useState("");


    const registerForm =(event)=>{
      event.preventDefault();
        setUserFullName(event.target[0].value);
        setEmail(event.target[1].value);
        setPassword(event.target[2].value);
    if(event.target[0].value === "" && event.target[1].value === "" && event.target[2].value === ""){
            alert("fill in the field")
        }
    };

    const showPassword = (event)=>{
        if (event.target.innerText === "show"){
            UseShow("not show");
        }else {
            UseShow("show")
        }
    };


    const auth = getAuth();
    if (email !== "" && password !== "" && userFullName !== "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const newDocRef = doc(collection(db, "users"));
                setDoc(newDocRef, {
                        userFullName: userFullName,
                        uid: user.uid,
                        projectId: newDocRef.id
                    }
                );

                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true)
            });
    }



    return(
        <div className="Register">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg register-image">
                    </div>
                    <div className="col-lg d-flex justify-content-center align-items-center">
                        <form onSubmit={event=>registerForm(event)}>
                            <div className="form-title text-center mb-5 ">
                                <h2>Welcome Back!</h2>
                            </div>
                            <div className="form-group mb-5">
                                <input type="text" className="form-control" id="exampleInputName"
                                       aria-describedby="emailHelp" placeholder="Your Full Name" />
                            </div>
                            <div className="form-group  mb-5">
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Your Email address"/>
                            </div>
                            <div className="form-group mb-5 login-password">
                                {
                                    show === "show" ?
                                        <input type="password" className="form-control" id="exampleInputPassword1"
                                               placeholder="Your Password"/>:
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                               placeholder="Your Password"/>
                                }
                                <p onClick={event=>showPassword(event)}>{show}</p>
                            </div>
                            {
                                error === true &&
                                <div className="alert alert-danger" role="alert">
                                    Your email or password is incorrect
                                </div>
                            }
                            <button type="submit" className="btn btn-success">SIGN UP</button>
                            <div className="mt-4 d-flex justify-content-center create-account">
                                <p>Already have an account. <a href="/login">LOGIN</a></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}