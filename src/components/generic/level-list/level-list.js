import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './level-list.css';

export default function LevelList(props) {
	const numbers = props.numbers || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div className="level-list">
			{numbers.map((num, index) => {
				return (
					<Form.Check
						key={index}
						type="checkbox"
						className="checkbox"
						onChange={props.onChange}
						value={index}
						label={num}
						inline
					/>
				);
			})}
		</div>
	);
}
LevelList.propTypes = {
	onChange: PropTypes.func.isRequired,
	numbers: PropTypes.number,
};
