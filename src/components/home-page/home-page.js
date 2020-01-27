import React from "react";
import NavBar from "../../core/nav-bar/nav-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function HomePage(props) {
    let match = useRouteMatch();
    return (
        <div>
            <NavBar></NavBar>
            <Switch>
                <Route path={`${match.path}/spells`}>
                    
                </Route>
                <Route path={match.path}>
                    home
                </Route>
            </Switch>
        </div>
    );
}

export default HomePage;
