import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-form.css";
function LoginForm(props) {
    const login = () => {
        console.log('Log in!');
        let username = document.getElementById('username-input').value;
        let password = document.getElementById('password-input').value;
        if(!username || !password) {
            console.log('not set');
        }
        console.log(username, password);
    }

    return (
        <Form>
            <h2>Login</h2>
            <Form.Group id="username" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control id="username-input" type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control id="password-input" type="password" placeholder="Password" />
            </Form.Group>
            <Button id="login-button" variant="danger" onClick={login}>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
