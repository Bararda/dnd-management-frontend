import React from 'react';

import './control-panel.css';
import PropTypes from 'prop-types';

export default function ControlPanel(props) {

    const clickElement = (element) => {
        props.callback(element);
    };

	return (
			<div className="control-panel">
                {React.Children.map(props.children, (child, index) => (
                        <div onClick={() => {
                            clickElement(child);
                        }}>
                            {React.cloneElement(child)}
                        </div>
                ))}
            </div>
	);
}
ControlPanel.propTypes = {
    children: PropTypes.node,
    callback: PropTypes.func
};