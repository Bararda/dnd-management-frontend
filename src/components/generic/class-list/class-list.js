import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { ClassService } from '../../../utils/services';
import './class-list.css';

export default function ClassList(props) {

    const [classList, setClassList] = useState([]);

    const loadClassList = () => {
        async function load() {
            const classes = await ClassService.get();
    
            setClassList(classes);
        }
        load();
    };

    useEffect(loadClassList, []);

    return (
        <div className='class-list'>
            {classList.map((classObj, index) => {
                    return (<Form.Check
                        key={index}
                        type="checkbox"
                        className="checkbox"
                        onChange={props.onChange}
                        value={classObj.class_name}
                        label={classObj.class_name}
                        inline
                    />);
                })}
        </div>
    );
}
ClassList.propTypes = {
    onChange: PropTypes.func.isRequired,
};