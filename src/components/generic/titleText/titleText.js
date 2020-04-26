import './titleText.css';
import React from 'react';
import PropTypes from 'prop-types';

function TitleText(props) {
    return (
        <div>
            <span className="title">{props.title}: </span>
            <span>{props.text}</span>
        </div>
    );
}
TitleText.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default TitleText;