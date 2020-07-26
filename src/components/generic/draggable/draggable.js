import React, { useState, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import './draggable.css';

const Draggable = React.forwardRef(function Draggable(props, ref) {
	const [classes, setclasses] = useState(['draggable']);
	const dragRef = useRef();
	const disableHighlight = () => {
		setclasses(['draggable']);
	};

	/**
	 * Starts dragging the component. Remembering where the user initially clicked on it
	 * @param {Event} ev
	 */
	const startDrag = (ev) => {
		highlightElement();
		const
		const element = ref.current.getElement();
		const rect = element.getBoundingClientRect();
        const offSetX = ev.pageX - rect.left - window.scrollX;
        const offSetY = ev.pageY - rect.top - window.scrollY;

		/**
		 * Moves an element to the mouse position
		 * defined inside startdrag so that it has a reference to the element
		 * @param {Event} ev
		 */
		const moveElement = (ev) => {
			if(!ev.altKey) {
				const posY = ev.pageY - offSetY;
            	const posX = ev.pageX - offSetX;
				element.style.top = posY + 'px';
				element.style.left = posX + 'px';
			}
		};

		//doesnt work yet
		const touchMoveElement = (ev) => {
			ev.preventDefault();
			const touch = ev.changedTouches[0];
			const posY = touch.pageY - offSetY;
            const posX = touch.pageX - offSetX;
			element.style.top = posY + 'px';
			element.style.left = posX + 'px';
		};

		/**
		 * Stops the element from dragging and removes the document event listeners
		 */
		const stopDrag = (ev) => {
			disableHighlight();
			document.removeEventListener('mousemove', moveElement);
			document.removeEventListener('mouseup', stopDrag);
			document.removeEventListener('touchend', stopDrag);
			document.removeEventListener('touchcancel', stopDrag);
			document.removeEventListener('touchmove', touchMoveElement);
		};

		document.addEventListener('mousemove', moveElement);
		document.addEventListener('touchmove', touchMoveElement);
		document.addEventListener('mouseup', stopDrag);
		document.addEventListener('touchend', stopDrag);
		document.addEventListener('touchcancel', stopDrag);
	};

	const highlightElement = () => {
		setclasses([...classes, 'border-enabled']);
	};

	const save = () => {
		const element = ref.current.getElement();
		const rect = element.getBoundingClientRect();
		const draggable = {
			x: rect.left,
			y: rect.top,
		};
		return draggable;
	};

	useImperativeHandle(ref, () => ({
		save,
		getElement: () => {
			return dragRef.current;
		}
	}));

	return (
		<div className={classes.join(' ')} onMouseDown={startDrag} onTouchStart={startDrag} ref={dragRef} style={{left: props.defaultX || 0, top: props.defaultY || 0}}>
			{props.children}
		</div>
	);
});
export default Draggable;

Draggable.propTypes = {
	children: PropTypes.node,
	defaultX: PropTypes.number,
	defaultY: PropTypes.number
};
