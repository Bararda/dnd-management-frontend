import React from 'react';
import './workspace.css';
import PropTypes from 'prop-types';


const Workspace = React.forwardRef(function Workspace(props, ref) {


    return (
        <div ref={ref} className="page" id="workspace">{props.children}</div>
    );
});


export default Workspace;
Workspace.propTypes = {
    children: PropTypes.node
};