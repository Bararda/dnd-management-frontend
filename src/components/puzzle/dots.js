import React, { useState, useEffect } from 'react';
import { isPropertyAccessChain } from 'typescript';
import './rune-dots.css';

function RuneDots(props) {

	// make service to get current position on refresh

	return (
		<div className={ props.correct ? 'rune-dot correct' : 'rune-dot'} onDrop={props.onDrop} 
		onDragStart={props.onDragStart}
		onDragEnd={props.onDragEnd}
		onDragOver={props.onDragOver}
		draggable>
		</div>
	);
}

export default RuneDots;
