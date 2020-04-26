import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/home-page/home-page';
import Spells from './components/spells/spells';
import PrivateRoute from './components/private-route/private-route';
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
                    <PrivateRoute path="/spells">
                        <Spells />
                    </PrivateRoute>
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