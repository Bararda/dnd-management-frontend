import React from 'react';
import NavBar from '../../core/nav-bar/nav-bar';
import { Spells, CharacterSheetBuilder } from '../';
import { Switch, Route } from 'react-router-dom';
import './home-page.css';

function HomePage() {
    // Order matters. Will route to the first route that matches.
    return (
        <div>
            <NavBar></NavBar>
            <div id="main-content">
                <Switch>
                    <Route path={'/home/spells'}>
                        <Spells />
                    </Route>
                    <Route path={'/home/characterSheetBuilder'}>
                       <CharacterSheetBuilder />
                    </Route>
                    <Route path={'/home/'}>Dnd Management App!
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default HomePage;
