import React from 'react';
import PropTypes from 'prop-types';

import {
    Route,
    Redirect,
} from 'react-router-dom';

function PrivateRoute(props) {
    return (
        <Route
            render={({ location }) =>
                window.localStorage.getItem('authenticated') === 'true' ? (
                    props.children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
PrivateRoute.propTypes = {
    children: PropTypes.object
};

export default PrivateRoute;