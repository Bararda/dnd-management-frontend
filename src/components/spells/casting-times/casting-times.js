import Form from 'react-bootstrap/Form';
import React from 'react';
import PropTypes from 'prop-types';
import './casting-times.css';

export default function CastingTimes(props) {
    
    return (
        <div className="concentration">
			<span>Casting Times</span>
            <Form.Control
                as="select"
                onChange={ev => {
                    props.onChange(ev);
                }}
                bsPrefix='form-control'
            >
                <option value="null">
                    None
                </option>
				<option value="action">
                    Action
                </option>
                <option value="bonus action">
                    Bonus Action
                </option>
				<option value="reaction">
                    Reaction
                </option>
            </Form.Control>
        </div>
    );
}
CastingTimes.propTypes = {
    onChange: PropTypes.func.isRequired
};
