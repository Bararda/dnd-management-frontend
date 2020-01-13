import React from 'react';
import LoginForm from './login-form/login-form';
import './main-page.css';
function MainPage(props) {
    return (
        <div id="main-page">
            <div id="login-form-container">
                <LoginForm />
            </div>
        </div>
    );
}

export default MainPage;