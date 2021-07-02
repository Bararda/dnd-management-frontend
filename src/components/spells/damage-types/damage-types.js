import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { DamageTypeService } from '../../../utils/services';
import PropTypes from 'prop-types';
import './damage-types.css';
export default function DamageTypes(props) {

    const [damageTypeList, setDamageTypes] = useState({});
    const [selectColor, setSelectColor] = useState('white');

    const loadDamageTypes = () => {
        async function load() {
            const damageTypes = await DamageTypeService.getDamageTypes();
            const typeObj = {};
    
            //convert the list to a hash map for quicker lookup
            for (const type of damageTypes) {
                typeObj[type.damage_type_id] = type.damage_type_name;
            }
            setDamageTypes(typeObj);
        }
        load();
    };

    const setColor = ev => {
        setSelectColor(COLORS[ev.target.value]);
    };

    useEffect(loadDamageTypes, []);
    
    return (
        <div className="damage-types">
            <span>Damage Types</span>
            <Form.Control
                as="select"
                onChange={ev => {
                    setColor(ev);
                    props.onChange(ev);
                }}
                style={{ backgroundColor: selectColor }}
                bsPrefix='form-control damage-type-select'
            >
                <option value="0" style={{ backgroundColor: 'white' }}>
                    None
                </option>
                {Object.entries(damageTypeList).map(([key, dt]) => {
                    const color = COLORS[dt] || 'aqua';
                    return (
                        <option key={key} value={dt} style={{ backgroundColor: color }}>
                            {dt}
                        </option>
                    );
                })}
            </Form.Control>
        </div>
    );
}
DamageTypes.propTypes = {
    onChange: PropTypes.func.isRequired
};




const COLORS = {
    acid: '#66F462',
    lightning: '#4E55FF',
    fire: '#FF351B',
    thunder: '#FFE24F',
    bludgeoning: '#A4A4A4',
    slashing: '#6d6e6d',
    piercing: '#421d13',
    cold: '#96E0FF',
    force: 'white',
    necrotic: 'black',
    poison: 'purple',
    radiant: '#FFF8CC',
    psychic: '#BCBAF0',
};