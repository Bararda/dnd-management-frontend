import React from "react";
import LoginForm from "./login-form/login-form";
import "./main-page.css";
function MainPage(props) {
    return (
        <div id="main-page">
            <div id="logo-container">
                <img
                    src={require("../../assets/images/d20.svg")}
                    id="logo"
                    alt="d20"
                />
            <div id="login-form-container">
                <LoginForm />
            </div>
            </div>
        </div>
    );
}

export default MainPage;
