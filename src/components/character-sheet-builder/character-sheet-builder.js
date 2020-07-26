import React, { useRef, useState, useEffect,  } from 'react';
import Draggable from '../generic/draggable/draggable';
import { AbilityModifier, DecoratedTextArea } from '../generic';
import Workspace from './workspace/workspace';
import ControlPanel from './control-panel/control-panel';
import ReactToPrint from 'react-to-print';
import './character-sheet-builder.css';
// import border1 from '../../assets/images/aaaa.webp';
// import border2 from '../../assets/images/celtic-border.png';
import border3 from '../../assets/images/olala.png';
export default function CharacterSheetBuilder(props) {
	// hard coded because idk how to get these yet - only works in 1920 x 1080
	// const workspaceOffsetX = 630;
	// const workspaceOffsetY = 270;
	const workspaceRef = useRef(null);
	const printWorkspaceRef = useRef(null);
	const decTextAreaBorder = useRef(null);
	//unknown what is causing this
	const boundingRectOffset = 0;
	const [workspaceOffsetX, setWorkspaceOffsetX] = useState(0);
	const [workspaceOffsetY, setWorkspaceOffsetY] = useState(0);
	const [components, setComponents] = useState([]);
	const [printComponents, setPrintComponents] = useState([]);

	const setWorkspaceBounds = () => {
		const workspaceElement = workspaceRef.current;
		const rect = workspaceElement.getBoundingClientRect();
		setWorkspaceOffsetX(rect.left + boundingRectOffset);
		setWorkspaceOffsetY(rect.top + boundingRectOffset);
	};

	useEffect(setWorkspaceBounds);
	window.onresize = setWorkspaceBounds;

	const addElement = (element, props) => {
		const elementRef = React.createRef();
		const newElement = React.cloneElement(element, {ref: elementRef});
		const dragRef = React.createRef();
		const component = React.createElement(Draggable, {ref: dragRef, key: components.length, defaultX: workspaceOffsetX, defaultY: workspaceOffsetY}, newElement);
		setComponents([...components, component]);
	};

	/**
	 * copys the elements into the real print area
	 */
	const preparePrint = () => {
		// make this return a promise with a very minor delay so that react will run the render before the print begins
		// work around for onBeforeGetContent not rerendering

		return new Promise((res, rej) => {
			const printComps = [];
			for(const draggable of components) {
				const element = draggable.ref.current.getElement();
				const newRef = React.createRef();
				const children = cloneChildren(draggable);

				const newElement = React.cloneElement(draggable, 
				{
					key: printComps.length, ref: newRef, defaultX: parseInt(element.style.left, 10) - workspaceOffsetX, 
					defaultY: parseInt(element.style.top, 10) - workspaceOffsetY
				}, children);
				printComps.push(newElement);
			}
			setPrintComponents(printComps);
			setTimeout(()=>{
				res();
			}, 200);
		});
	};
	

	/**
	 * Clones an elements children based on the ref, for deep copying objects to contain styles (I dont like this)
	 * @param {Draggable} draggable 
	 */
	const cloneChildren = draggable => {
		const children = React.Children.map(draggable.props.children, (child, i) => {
			const element = child.ref.current;
			const newRef = React.createRef();
			// may need to change if I ever need to overwrite other element style properties
			const clone = React.cloneElement(child, {ref: newRef, styleString: element.style.cssText});
			return clone;
		});
		return children;
	};

    const restorePage = () => {
		setPrintComponents([]);
	};

	const textAreaBorderImage = `border-image: url(${border3}) 50 / 2 / 15px;`;
	const textAreaBorderWidth = 'border: 20px solid transparent;';
	const textAreaBorder = [textAreaBorderWidth, textAreaBorderImage];
	const textAreaBorderStyle = textAreaBorder.join(' ');

	//https://www.arcadequartermaster.com/capcom/ddsom/border.png

	return (
		<div>
			<ControlPanel callback={addElement}>
				<AbilityModifier name="test"></AbilityModifier>
				<DecoratedTextArea></DecoratedTextArea>
				<DecoratedTextArea ref={decTextAreaBorder} styleString={textAreaBorderStyle}></DecoratedTextArea>
				
			</ControlPanel>
			<ReactToPrint
				trigger={() => <button className="print-button">Print</button>}
                content={() => printWorkspaceRef.current}
                copyStyles={true}
                onBeforeGetContent={preparePrint.bind(this)}
                onAfterPrint={restorePage}
			/>
			{/* <Draggable containerOffsetX={boundingRectOffset} containerOffsetY={boundingRectOffset}>Character Sheet Builder</Draggable> */}
			<br></br>

			<Workspace ref={workspaceRef}>
				{components}
			</Workspace>
            <div className="print-workspace">
                <Workspace ref={printWorkspaceRef}>
					{printComponents}
                </Workspace>
            </div>
		</div>
	);
}
