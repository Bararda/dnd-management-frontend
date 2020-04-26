import React from 'react';
import NavBar from '../../core/nav-bar/nav-bar';
import Spells from '../spells/spells';
import { Switch, Route } from 'react-router-dom';
import './home-page.css';

function HomePage() {
    return (
        <div>
            <NavBar></NavBar>
            <div id="main-content">
                <Switch>
                    <Route path={'/home/spells'}>
                        <Spells />
                    </Route>
                    <Route path='/home/'>home</Route>
                </Switch>
            </div>
        </div>
    );
}

export default HomePage;
