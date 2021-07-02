import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { PuzzleService } from '../../utils/services';
import SubscriptionService from '../../utils/services/subsciption.service';
import RuneDots from './dots';
import './rune-puzzle.css';


function RunePuzzle(props) {
	const [currentPosition, setCurrentPosition] = useState(0);
	const [dots, setDots] = useState(1);

	const loadPuzzleData = () => {
		PuzzleService.getRunePuzzleStatus().then(intializePuzzle);
		const eventSource = SubscriptionService.post();
		eventSource.addEventListener('rune-puzzle', (event) => {
			intializePuzzle(JSON.parse(event.data));
		});
	}

	const rotateOffset = 18;
	const intializePuzzle = (puzzleData) => {
		setCurrentPosition(puzzleData.currentPosition);
		update(puzzleData);
	}
	// make service to get current position on refresh
	let currentlyDragged = null;
	const rotate = () => {
		PuzzleService.updatePuzzleStatus({}, {currentPosition: true}).then(intializePuzzle);
	}

	const resetPuzzle = () => {
		PuzzleService.resetPuzzle().then(intializePuzzle);
	}


	const update = (data) => {
		const dotElements = [];
		for(let i = 0; i < data.correctDots; i++) {
			dotElements.push(
				<RuneDots 
					onDrop={(e) => {dotDrop(e, i)}} 
					onDragStart={() => {dotDragStart(i)}}
					onDragStop={() => {dotDragStop()}}
					onDragOver={(e) => {dotDragover(e)}}
					correct={true}
					key={i}
				/>
			);
		}
		for(let i = 0; i < data.newDots; i++) {
			const index = i + data.correctDots;
			dotElements.push(
				<RuneDots 
					onDrop={(e) => {dotDrop(e, index)}} 
					onDragStart={() => {dotDragStart(index)}}
					onDragStop={() => {dotDragStop()}}
					onDragOver={(e) => {dotDragover(e)}}
					key={index}
				/>
			);
		}
		setDots(dotElements);
	}


	const dotDragStart = (draggedDotIndex) => {
		currentlyDragged = draggedDotIndex;
	}

	const dotDrop = (ev, droppedDotIndex) => {
		ev.preventDefault();
		ev.stopPropagation();
		PuzzleService.updatePuzzleStatus({}, {connect: [droppedDotIndex, currentlyDragged]}).then(intializePuzzle);
		currentlyDragged = null;
	}

	const dotDragStop = () => {
		currentlyDragged = null;
	}

	const dotDragover = (ev) => {
		ev.preventDefault();
    	ev.stopPropagation();
	}

	/**
	 * Initial loading for the component
	 */
	useEffect(loadPuzzleData, []);

	return (
		<div>
			<div style={{ backgroundColor: colors[currentPosition]}} className='rune-puzzle' onClick={()=> {rotate()}}>
				<img className='rune-image' src={require('../../assets/images/runes.png')} style={{transform: `rotate(${(currentPosition * 36) + 17}deg)`}}></img>
				<div className="dot-container">
					{dots}
				</div>
			</div>
			<Button onClick={()=>{resetPuzzle()}}>reset</Button>
		</div>


	);
}

export default RunePuzzle;


const colors = [
	'#d0fefe',
	'#ffa500',
	'pink',
	'brown',
	'green',
	'#ffccff',
	'red',
	'#191970',
	'yellow',
	'purple',
];