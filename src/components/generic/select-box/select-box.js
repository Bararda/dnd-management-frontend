import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export default function SelectBox(props) {
	let noneOption;
	if (props.noneOption) {
		noneOption = (
			<option value="0">
				None
			</option>
		);
	}

	return (
		<div className="select-box">
			<Form.Control
				as="select"
				onChange={(ev) => {
					const value = ev.target.value;
					if (props.onChange) {
						props.onChange(value);
					}
				}}
				value={props.value}
				bsPrefix={props.bsPrefix}
			>
				{noneOption}

				{props.list.length > 0 ? props.list.map((obj, key) => {
					return (
						<option key={key} value={obj.value}>
							{obj.name}
						</option>
					);
				}) : null}
			</Form.Control>
		</div>
	);
}
SelectBox.propTypes = {
	onChange: PropTypes.func,
	noneOption: PropTypes.bool,
	list: PropTypes.array,
	bsPrefix: PropTypes.string,
	value: PropTypes.string
};
