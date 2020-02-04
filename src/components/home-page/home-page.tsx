import React from "react";
import NavBar from "../../core/nav-bar/nav-bar";
import Spells from "../spells/spells";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

const HomePage: React.FC<any> = (props) => {
    let match = useRouteMatch();
    return (
        <div>
            <NavBar></NavBar>
            <Switch>
                <Route path={`/home/spells`}>
                    <Spells />
                </Route>
                <Route path="/home/">
                    home
                </Route>
            </Switch>
        </div>
    );
}

export default HomePage;
