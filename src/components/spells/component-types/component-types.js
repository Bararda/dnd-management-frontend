import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './component-types.css';
// TODO add state into component
export default function ComponentTypes(props) {
    return (
        <div>
                        <span>Component Types</span>

        <div className='component-types'>
            {props.componentTypeList.map((ct) => {
                return (
                    <Form.Check
                        key={ct.component_type_id}
                        type="checkbox"
                        className="checkbox"
                        onChange={props.onChange}
                        value={ct.component_type_name}
                        label={ct.component_type_name.charAt(0).toUpperCase()}
                        checked={props.filter.includes(
                            ct.component_type_name
                        )}
                        inline
                    />
                );
            })}
        </div>
        </div>
    );
}
ComponentTypes.propTypes = {
    componentTypeList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.array.isRequired
};