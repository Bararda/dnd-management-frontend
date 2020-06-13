import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage, PrivateRoute } from './components';
import LoginPage from './components/login-page/login-page';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
    return (
        <div id="app">
            <Router>
                <Switch>
                    <PrivateRoute path="/home">
                        <HomePage />
                    </PrivateRoute>
                    <Route path="/">
                        <LoginPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;