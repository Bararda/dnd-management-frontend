import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './spell-book-modal.css';
import { SpellBookSpellService, SpellBookService } from '../../../utils/services';

export default function SpellBookModal(props) {
    const modalProps = {
        onHide: props.onHide,
    };
    const [spellBooks, setSpellBooks] = useState([]);
    const [show, setShow] = useState(false);
    const loadSpellBooks = async () => {
        const spellBookList = await SpellBookService.get();
        setSpellBooks(spellBookList);
    };
    const addToSpellBook = async (spellBookID) => {
        SpellBookSpellService.post({spell_book_id: spellBookID, spell_id: props.spellID});
        setShow(false);
    };

    const setModalProps = () => {
        setShow(props.show);
    };

    useEffect(setModalProps, [props.show]);


	return (
		<Modal
			{...modalProps}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
            centered
            onEnter={loadSpellBooks}
            show={show}
		>
			<Modal.Header closeButton bsPrefix="spell-book-modal modal-header">
				<Modal.Title id="contained-modal-title-vcenter">
					Select Spell Book
				</Modal.Title>
			</Modal.Header>
			<Modal.Body bsPrefix="spell-book-modal modal-body">
				<div>
                    {spellBooks.map((spellBook, key) => {
                        return (<Button key={key} bsPrefix="spell-book-modal-button" variant="outline-dark" onClick={() => addToSpellBook(spellBook.spell_book_id)}>{spellBook.spell_book_name}</Button>);
                    })}
				</div>
			</Modal.Body>
		</Modal>
	);
}
SpellBookModal.propTypes = {
    onHide: PropTypes.func,
    spellID: PropTypes.number,
    show: PropTypes.bool,
};
