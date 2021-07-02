import React, { useState, useEffect } from 'react';
import Npc from './npc/npc';
import { Draggable } from '../generic/';
import Button from 'react-bootstrap/Button';
import './npc-manager.css';
import Form from 'react-bootstrap/Form';
import shortid from 'shortid';
function NpcManager(props) {
	const [components, setComponents] = useState([]);
	const [npcs, setNpcs] = useState([]);
	const [rollType, setRollType] = useState('');
	const [toDelete, setToDelete] = useState({});

	const addNpc = () => {
		const [npc, component] = getNewNpc();
		setComponents([...components, component]);
		setNpcs([...npcs, npc]);
	};


	const getNewNpc = (npcProps = {}, dragProps = {x:320, y:100}, key = components.length) => {
		const npcRef = React.createRef();
		const npc = React.createElement(Npc, {ref: npcRef, ...npcProps});
		const dragRef = React.createRef();
		const deleteButton = React.createElement(Button, {variant:'outline-danger', className: 'delete-button', onClick: () => {setToDelete({dragRef, npcRef});}}, 'X');
		const component = React.createElement(
			Draggable,
			{
				ref: dragRef,
				key: shortid.generate(),
				defaultX: dragProps.x,
				defaultY: dragProps.y,
			},
			npc,
			deleteButton,
		);
		return [npc, component];
	};

	const rollAll = () => {
		for(const npc of npcs) {
			const npcRef = npc.ref;
			npcRef.current.rollType(rollType);
		}
	};

	const updateRollType = (ev) => {
		const newRollType = ev.target.value;
		setRollType(newRollType);
	};

	const deleteNpc = () => {

		const newDraggables = components.filter((draggable) => draggable.ref !== toDelete.dragRef);
		const newNpcs = npcs.filter((npc) => npc.ref !== toDelete.npcRef);

		setComponents(newDraggables);
		setNpcs(newNpcs);
	};

	const getStates = () => {
		const states = [];
		for(const [index, draggable] of components.entries()) {
			const dragState = draggable.ref.current.save();
			const npc = npcs[index];
			const npcState = npc.ref.current.save();
			states.push({
				dragState,
				npcState
			});
		}
		return states;
	};

	//hacked on save functionality, Not really a fan of how I'm doing this but I dont wanna spend forever on it
	const save = () => {
		const states = getStates();
		const fileData = JSON.stringify(states);
		const blob = new Blob([fileData], {type: 'text/plain'});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = 'npcs.json';
		link.href = url;
		link.click();
	};

	useEffect(deleteNpc, [toDelete]);


	const load = (ev) => {
		const files = ev.target.files;
		for(const file of files) {
			file.text().then((contents) => {
				const json = JSON.parse(contents);
				const newNpcs = [];
				const newDraggables = [];
				let key = components.length;
				if(Array.isArray(json)) {
					for(const comp of json) {
						const [npc, draggable] = getNewNpc(comp.npcState, comp.dragState, key);
						newNpcs.push(npc);
						newDraggables.push(draggable);
						key++;
					}
				}
				setComponents([...components, ...newDraggables]);
				setNpcs([...npcs, ...newNpcs]);
			});
		}
	};

	return (
		<div className="npc-manager">
			<Form.Control as="select" onChange={updateRollType} className='npc-rolltype-select'>
				<option value="">
					None
				</option>
                <option value="Strength">
					Strength
				</option>
                <option value="Dexterity">
					Dexterity
				</option>
                <option value="Constitution">
					Constitution
				</option>
                <option value="Intelligence">
					Intelligence
				</option>
                <option value="Wisdom">
					Wisdom
				</option>
                <option value="Charisma">
					Charisma
				</option>
			</Form.Control>
			{components}
			<Button onClick={rollAll} variant="outline-light" className='roll-all'>Roll All</Button>
			<Button onClick={addNpc} variant="outline-light" className='new-npc'>New NPC</Button>
			<Button onClick={save} variant="outline-success" className='save-npcs'>Save</Button>
			<Form.File label="Load" onChange={load} accept=".json" className='load-npcs'/>
		</div>
	);
}

export default NpcManager;


