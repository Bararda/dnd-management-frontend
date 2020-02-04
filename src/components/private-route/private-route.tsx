import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";

const PrivateRoute: React.FC<any> = (props) => {
    return (
        <Route
            render={({ location }) =>
                window.localStorage.getItem("authenticated") ? (
                    props.children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


export default PrivateRoute;