import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './ritual.css';

export default function Ritual(props) {
    
    const [usingRitual, setUsingRitual] = useState(0);

	const onChange = () => {
		props.onChange(!usingRitual);
		setUsingRitual(!usingRitual);
	};

    return (
        <div className="ritual">
			<span>Ritual</span>
            <Form.Check
                type="checkbox"
                className="checkbox"
                onChange={onChange}
				checked={usingRitual}
				value={usingRitual}
				inline
            />
        </div>
    );
}
Ritual.propTypes = {
    onChange: PropTypes.func.isRequired
};
