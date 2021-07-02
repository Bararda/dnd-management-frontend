import React, {useEffect} from 'react';
import './decorated-text-area.css';
import PropTypes from 'prop-types';
const DecoratedTextArea = React.forwardRef(function DecoratedTextArea(props, ref) {   

    /**
     * Adds the css string to the element if it has a forwarded reference (Should move to helper function)
     * If not, There is nothing I can do dude
     */
    const addStyleString = () => {
        if(ref) {
            ref.current.style = props.styleString;
        }
    };

    useEffect(addStyleString, []);

    return (
        <textarea ref={ref} className="decorated-text-area" >

        </textarea>
    );
}); 
export default DecoratedTextArea;

DecoratedTextArea.propTypes = {
    styleString: PropTypes.string,
};