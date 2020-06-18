import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { ClassService } from '../../../utils/services';
import './class-list.css';

export default function ClassList(props) {

    const [classList, setClassList] = useState([]);
    const [selectedClassList, setSelectedClassList] = useState([]);

    const loadClassList = () => {
        async function load() {
            const classes = await ClassService.get();
    
            setClassList(classes);
        }
        load();
    };

	const setFromCheckBox = (ev) => {
		let selected = [...selectedClassList];
		const value = ev.target.value;
		if (selected.includes(value)) {
			selected = selected.filter((level) => {
				return level !== value;
			});
		} else {
			selected.push(value);
		}
		setSelectedClassList(selected);
		props.onChange(selected);
	};

	const setFromSelect = (ev) => {
		const selected = [];
		for(const option of ev.target.options) {
			if(option.selected) {
				const value = option.value;
				selected.push(value);
			}
		}
		setSelectedClassList(selected);
		props.onChange(selected);
    };
    
	const onChange = (ev) => {
		if (ev.target.tagName === 'SELECT') {
			setFromSelect(ev);
		} else {
			setFromCheckBox(ev);
		}
	};

    useEffect(loadClassList, []);

    return (
        <div>

            <div className="show-on-mobile class-select">
				<Form.Control
					as="select"
					multiple
					onChange={onChange}
					value={selectedClassList}
				>
					{classList.map((classObj, index) => {
						return (
							<option key={index} value={classObj.class_name}>
								{classObj.class_name}
							</option>
						);
					})}
				</Form.Control>
			</div>
			<div className="hidden-on-mobile class-list">
                {classList.map((classObj, index) => {
                    return (<Form.Check
                        key={index}
                        type="checkbox"
                        className="checkbox"
                        onChange={onChange}
                        checked={selectedClassList.includes(classObj.class_name)}
                        value={classObj.class_name}
                        label={classObj.class_name}
                        inline
                    />);
                })}
			</div>
            
        </div>
    );
}
ClassList.propTypes = {
    onChange: PropTypes.func.isRequired,
};