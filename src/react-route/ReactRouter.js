import React from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Footer from "../components/footer/Footer";
import Login from "../pages/login-page/Login";
import Register from "../pages/register-page/Register";
import Dashboard from "../pages/dashboards/dashboard/Dashboard";
import Profile from "../pages/dashboards/profile/Profile";
import Cart from "../pages/dashboards/cart/Cart";

export default function ReactRouter() {
    return (
        <div style={{background: "#00302E"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={[ <Header/>,<Main/>,<Footer/>]}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

