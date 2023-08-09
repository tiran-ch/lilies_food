import React from "react";
import "./Header.css";
import Logo from "../../images/header-logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const headerNav =(event)=>{
        switch (event.target.innerText) {
            case "Login":
                navigate("/login");
                break;
            case "Sign Up":
                navigate("/register");
        }
    };

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light container m-auto pt-5">
                <div className="header-logo">
                    <img src={Logo} className="navbar-brand"/>
                    <h1>Lilies</h1>
                </div>
                <button className="navbar-toggler text-white bg-white" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav mr-auto">

                    </div>
                   <div>
                       <ul className="header-list d-flex navbar-nav mr-auto" onClick={event=> headerNav(event)}>
                           <li className=""><a href="" className="text-decoration-none text-white">Home</a></li>
                           <li className=""><a href="" className="text-decoration-none text-white">Login</a></li>
                           <li className=""><a href="" className="text-decoration-none text-white">Sign Up</a></li>

                       </ul>
                   </div>
                </div>
            </nav>
        </header>
    )
}