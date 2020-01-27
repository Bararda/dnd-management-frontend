import React from "react";
import {
    Route,
    Redirect,
  } from "react-router-dom";
function PrivateRoute({ children, ...rest }) {
    console.log('here');
    console.log(window.localStorage.getItem("authenticated"));
    return (
        <Route
            {...rest}
            render={({ location }) =>
                window.localStorage.getItem("authenticated") ? (
                    children
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