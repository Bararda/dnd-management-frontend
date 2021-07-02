import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-form.css';
import AuthService from '../../../utils/services/auth.service';
import {
    useHistory,
  } from 'react-router-dom';
function LoginForm(props) {

    const [errorText, setErrorText] = useState('');
    const history = useHistory();

    const login = async () => {
        //TODO change to react refs
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;

        if(username && password) {
            if(await AuthService.login(username, password)) {
                history.replace('/home');
            }
        } else {
            setErrorText('Both Username and Password are Required!');
        }
    };

    const checkEnterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            login();
        }
    };

    return (
        <Form>
            <h2>Login</h2>
            <Form.Group >
                <Form.Label className="hide-on-mobile" >Username</Form.Label>
                <Form.Control id="username-input" type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group >
                <Form.Label className="hide-on-mobile">Password</Form.Label>
                <Form.Control id="password-input" onKeyUp={checkEnterKey} type="password" placeholder="Password" />
            </Form.Group>
            {errorText}
            <Button id="login-button" variant="danger" onClick={login}>
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
