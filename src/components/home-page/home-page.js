import React from 'react';
import NavBar from '../../core/nav-bar/nav-bar';
import { Spells, CharacterSheetBuilder, Upcoming, InventoryManager, NpcManager } from '../';
import { Switch, Route } from 'react-router-dom';
import './home-page.css';
import RunePuzzle from '../puzzle/puzzle';

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
                    <Route path={'/home/inventoryManager'}>
                       <InventoryManager />
                    </Route>
                    <Route path={'/home/npcManager'}>
                       <NpcManager />
                    </Route>
                    <Route path={'/home/RunePuzzle/'}>
                        <RunePuzzle />
                    </Route>
                    <Route path={'/home/'}>
                        This is a work in progress application. Updates are irregular and features are worked on in no particular order
                        <Upcoming></Upcoming>
                    </Route>
                    
                </Switch>
            </div>
        </div>
    );
}

export default HomePage;
