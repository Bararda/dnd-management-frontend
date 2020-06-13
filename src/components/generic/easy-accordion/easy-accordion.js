import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default function EasyAccordion(props) {
    console.log(props.alwaysOpen? 1 : 0);
    let button = (
        <Accordion.Toggle as={Card.Header} eventKey={0}>
            {props.title}
        </Accordion.Toggle>
    );
    let style = {};
    if(props.alwaysOpen) {
        style = { height: '100%' };
        button = (
            <Card.Header>
                {props.title}
            </Card.Header>
        );
    }
    return (
        <Accordion defaultActiveKey={props.defaultOpen? 0 : 1} style={style}>
            <Card style={style}>
                {button}
                <Accordion.Collapse eventKey={0}>
                    <Card.Body>
                        {props.children}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}
EasyAccordion.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    alwaysOpen: PropTypes.bool,
    defaultOpen: PropTypes.bool
};