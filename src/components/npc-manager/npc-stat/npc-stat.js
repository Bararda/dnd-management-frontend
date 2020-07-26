import React, {useState, useImperativeHandle, useEffect} from 'react';
import PropTypes from 'prop-types';
import './npc-stat.css';
const NpcStat = React.forwardRef(function NpcStat(props, ref) {
    const [stat, setStat] = useState(0);
    const updateStat = (ev) => {
        const tempStat = parseInt(ev.target.value);
        setStat(tempStat);
    };

    const roll = () => {
        props.roll(stat);
    };

    const getStat = () => {
        return stat;
    };

    useImperativeHandle(ref, () => ({
        roll: roll,
        getStat: getStat
    }));

    const loadProps = () => {
        setStat(props.defaultValue);
    };

	useEffect(loadProps, []);

    return (
        <div className={'labeled-input ' + props.className} ref={ref}>
            <label className='labeled-input-name' onClick={() => {roll();}}>{props.name}</label>
            <input className='labeled-input-box' type={props.type} onChange={updateStat} defaultValue={props.defaultValue}/>
        </div>
    );
});

export default NpcStat;


NpcStat.propTypes = {
    defaultValue: PropTypes.number,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    roll: PropTypes.func.isRequired
};