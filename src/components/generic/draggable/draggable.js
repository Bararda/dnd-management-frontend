import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './draggable.css';

const Draggable = React.forwardRef(function Draggable(props, ref) {
	const [classes, setclasses] = useState(['draggable']);

	const disableHighlight = () => {
		setclasses(['draggable']);
	};

	/**
	 * Starts dragging the component. Remembering where the user initially clicked on it
	 * @param {Event} ev
	 */
	const startDrag = (ev) => {
		highlightElement();
		const element = ref.current;
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

		/**
		 * Stops the element from dragging and removes the document event listeners
		 */
		const stopDrag = (ev) => {
			disableHighlight();
			document.removeEventListener('mousemove', moveElement);
			document.removeEventListener('mouseup', stopDrag);
		};

		document.addEventListener('mousemove', moveElement);
		document.addEventListener('mouseup', stopDrag);
	};

	const highlightElement = () => {
		setclasses([...classes, 'border-enabled']);
	};

	return (
		<div className={classes.join(' ')} onMouseDown={startDrag} ref={ref} style={{left: props.defaultX || 0, top: props.defaultY || 0}}>
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
