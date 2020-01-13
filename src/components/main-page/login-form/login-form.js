import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login-form.css";
function LoginForm(props) {
    return (
        <Form>
            <h2>Login</h2>
            <Form.Group id="username" controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button id="login-button" variant="danger" type="submit">
                Login
            </Button>
        </Form>
    );
}

export default LoginForm;
