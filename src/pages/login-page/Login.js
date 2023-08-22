import React, {useEffect, useState} from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app, {db} from "../../fireabase/Firebase";
import {collection, addDoc, getDocs} from "@firebase/firestore";

export default function Login() {
    const [show, UseShow] = useState("show");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);



    const showPassword = (event)=>{
        if (event.target.innerText === "show"){
            UseShow("not show");
        }else {
            UseShow("show")
        }
    };

    const registerForm =(event)=>{
        event.preventDefault();
        setEmail(event.target[0].value);
        setPassword(event.target[1].value);
    };

    // useEffect(()=>{
    //     (async ()=>{
    //         const colRef = collection(db, "users");
    //         const snapShot = await  getDocs(colRef);
    //     })()
    // },[]);



    const auth = getAuth();
    if (email !== "" && password !== "")
    {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem('userToken', JSON.stringify(user.accessToken));
                localStorage.setItem('userId', JSON.stringify(user.uid));
                setError(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
            });
    }

    return(
        <div className="Login">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg login-image">
                    </div>
                    <div className="col-lg d-flex justify-content-center align-items-center">
                        <form onSubmit={event=>registerForm(event)}>
                            <div className="form-title text-center mb-5 ">
                                <h2>Welcome Back!</h2>
                            </div>
                            <div className="form-group  mb-5">
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Your Email address"/>
                            </div>
                            <div className="form-group mb-4 login-password">
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

                            <button type="submit" className="btn btn-success">Submit</button>
                            <div className="mt-2 d-flex justify-content-between create-account">
                                <p><a href="/register">Create an account</a></p>
                                <p><a href="#">Forgot Passoword</a></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}