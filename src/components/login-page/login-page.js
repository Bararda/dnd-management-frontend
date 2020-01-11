import React from 'react';
import Form from "react-bootstrap/Form";
function LoginPage(props) {
    return (
        <Form>
            <Form.Group controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"/>
            </Form.Group>
            <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group controlId="loginRememberMe">
                <Form.Label>Remember Me</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
            </Form.Group>
        </Form>
    );
}

export default LoginPage