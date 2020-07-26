import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import NpcStat from '../npc-stat/npc-stat';
import PropTypes from 'prop-types';
import './npc.css';
import Button from 'react-bootstrap/Button';
const Npc = React.forwardRef(function Npc(props, ref) {
    const [rolledNumber, setRolledNumber] = useState(0);
    const [name, setName] = useState(props.defaultName || '');
    const [cssClass, setCssClass] = useState('');

    const refs = {
        Strength: useRef(null),
        Dexterity: useRef(null),
        Constitution: useRef(null),
        Intelligence: useRef(null),
        Wisdom: useRef(null),
        Charisma: useRef(null),
    };

    const roll = (toAdd = 0) => {
            let rolled = Math.floor((Math.random() * 20)) + 1;
            if(rolled === 20) {
                setCssClass('crit-success');
            } else if (rolled === 1) {
                setCssClass('crit-fail');
            } else {
                setCssClass('');
            }
            rolled += toAdd;

            setRolledNumber(rolled);
    };

    const rollType = (type) => {
        if(type in refs) {
            refs[type].current.roll();
        } else {
            roll();
        }
    };

    const loadProps = () => {
        setName(props.defaultName);
    };

	useEffect(loadProps, []);

    const updateName = (ev) => {
        setName(ev.target.value);
    };

    const save = () => {
        const npc = {
            str: refs.Strength.current.getStat(),
            dex: refs.Dexterity.current.getStat(),
            con: refs.Constitution.current.getStat(),
            int: refs.Intelligence.current.getStat(),
            wis: refs.Wisdom.current.getStat(),
            cha: refs.Charisma.current.getStat(),
            defaultName: name
        };
        return npc;
    };

    useImperativeHandle(ref, () => ({
        rollType: rollType,
        save: save
    }));



    return (
        <div className='npc'>
            <div className='npc-wrapper'>
                <input type='text' className='npc-name' placeholder='Name' defaultValue={props.defaultName} onChange={updateName}/>
                <input type='number' className={'npc-roll ' + cssClass} value={rolledNumber} readOnly/>
                <Button className="npc-roll-button" variant="outline-light" onClick={() => {roll();}}>Roll</Button>
            </div>
            <NpcStat name='str' type='number' className="npc-str" roll={roll} ref={refs.Strength} defaultValue={props.str}/>
            <NpcStat name='dex' type='number' className="npc-dex" roll={roll} ref={refs.Dexterity} defaultValue={props.dex}/>
            <NpcStat name='con' type='number' className="npc-con" roll={roll} ref={refs.Constitution} defaultValue={props.con}/>
            <NpcStat name='int' type='number' className="npc-int" roll={roll} ref={refs.Intelligence} defaultValue={props.int}/>
            <NpcStat name='wis' type='number' className="npc-wis" roll={roll} ref={refs.Wisdom} defaultValue={props.wis}/>
            <NpcStat name='cha' type='number' className="npc-cha" roll={roll} ref={refs.Charisma} defaultValue={props.cha}/>
        </div>
    );
});

export default Npc;


Npc.propTypes = {
    defaultName: PropTypes.string,
    str: PropTypes.number,
    dex: PropTypes.number,
    con: PropTypes.number,
    int: PropTypes.number,
    wis: PropTypes.number,
    cha: PropTypes.number,
};