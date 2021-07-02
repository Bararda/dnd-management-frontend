import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { SchoolService } from '../../../utils/services';
import './school-list.css';

export default function SchoolList(props) {

    const [schoolList, setSchoolList] = useState([]);
    const [selectedSchoolList, setSelectedSchoolList] = useState([]);

    const loadSchoolList = () => {
        async function load() {
            const schools = await SchoolService.getSchools();
            setSchoolList(schools);
        }
        load();
    };

	const setFromCheckBox = (ev) => {
		let selected = [...selectedSchoolList];
		const value = parseInt(ev.target.value, 10);
		if (selected.includes(value)) {
			selected = selected.filter((schoolId) => {
				return schoolId !== value;
			});
		} else {
			selected.push(value);
		}
		setSelectedSchoolList(selected);
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
		setSelectedSchoolList(selected);
		props.onChange(selected);
    };
    
	const onChange = (ev) => {
		if (ev.target.tagName === 'SELECT') {
			setFromSelect(ev);
		} else {
			setFromCheckBox(ev);
		}
	};

    useEffect(loadSchoolList, []);

    return (
        <div>
			<span>Schools</span>
            <div className="show-on-mobile school-select">
				<Form.Control
					as="select"
					multiple
					onChange={onChange}
					value={selectedSchoolList}
				>
					{schoolList.map((school, index) => {
						return (
							<option key={index} value={school.school_id}>
								{school.school_name}
							</option>
						);
					})}
				</Form.Control>
			</div>
			<div className="hidden-on-mobile school-list">
				{schoolList.map((school, index) => {
                    return (<Form.Check
                        key={index}
                        type="checkbox"
                        className="checkbox"
                        onChange={onChange}
                        checked={selectedSchoolList.includes(school.school_id)} // slow should use map
                        value={school.school_id}
                        label={school.school_name}
                        inline
                    />);
                })}
			</div>
            
        </div>
    );
}
SchoolList.propTypes = {
    onChange: PropTypes.func.isRequired,
};