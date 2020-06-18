import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './level-list.css';

export default function LevelList(props) {
	const [selectedLevels, setSelectedLevels] = useState([]);
	const setFromCheckBox = (ev) => {
		let selected = [...selectedLevels];
		const value = parseInt(ev.target.value, 10);
		if (selected.includes(value)) {
			selected = selected.filter((level) => {
				return level !== value;
			});
		} else {
			selected.push(value);
		}
		setSelectedLevels(selected);
		props.onChange(selected);
	};

	const setFromSelect = (ev) => {
		const selected = [];
		for(const option of ev.target.options) {
			if(option.selected) {
				const value = parseInt(option.value, 10);
				selected.push(value);
			}
		}
		setSelectedLevels(selected);
		props.onChange(selected);
	};
	const onChange = (ev) => {
		if (ev.target.tagName === 'SELECT') {
			setFromSelect(ev);
		} else {
			setFromCheckBox(ev);
		}
	};
	const numbers = props.numbers || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div>
			<div className="show-on-mobile level-select">
				<Form.Control
					as="select"
					multiple
					onChange={onChange}
					value={selectedLevels}
				>
					{numbers.map((num, index) => {
						return (
							<option key={index} value={index}>
								{num}
							</option>
						);
					})}
				</Form.Control>
			</div>
			<div className="hidden-on-mobile level-list">
				{numbers.map((num, index) => {
					return (
						<Form.Check
							key={index}
							type="checkbox"
							className="checkbox"
							onChange={onChange}
							checked={selectedLevels.includes(num)}
							value={index}
							label={num}
							inline
						/>
					);
				})}
			</div>
		</div>
	);
}
LevelList.propTypes = {
	onChange: PropTypes.func.isRequired,
	numbers: PropTypes.number,
};
