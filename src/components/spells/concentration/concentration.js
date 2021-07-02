import Form from 'react-bootstrap/Form';
import React from 'react';
import PropTypes from 'prop-types';
import './concentration.css';

export default function Concentration(props) {
    
    return (
        <div className="concentration">
			<span>Concentration</span>
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
				<option value="0">
                    Non-Concentration
                </option>
                <option value="1">
                    Concentration
                </option>
            </Form.Control>
        </div>
    );
}
Concentration.propTypes = {
    onChange: PropTypes.func.isRequired
};
