import React from 'react';
import PropTypes from 'prop-types';
import './ability-modifier.css';
const AbilityModifier = React.forwardRef(function AbilityModifier(props, ref) {

    return (
        <div className="ability-modifier" ref={ref}>
            <div>
                <input className="modifier-name" type="text"/>
                <input className="ability-modifier-top" type="number"></input>
            </div>
            <div>
                <input className="ability-modifier-bottom" type="number"></input>
            </div>
        </div>
    );
});

AbilityModifier.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    styleString: PropTypes.string
};

export default AbilityModifier;