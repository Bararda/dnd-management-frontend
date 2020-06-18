import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './spell-book-modal.css';
import {
	SpellBookSpellService,
	SpellBookService,
} from '../../../utils/services';

export default function SpellBookModal(props) {
	const modalProps = {
		onHide: props.onHide,
	};
	const [spellBooks, setSpellBooks] = useState([]);
	const [show, setShow] = useState(false);
	const loadSpellBooks = async () => {
		let spellBookList = await SpellBookService.get();
		let spellSpellBooks = await SpellBookSpellService.get({
			spell_id: props.spellID,
		});
		spellSpellBooks = spellSpellBooks.map((sbs) => sbs.spell_book_id);
		spellBookList = spellBookList.map((spellBook) => {
			spellBook.containsSpell = spellSpellBooks.includes(
				spellBook.spell_book_id
			);
			return spellBook;
		});
		setSpellBooks(spellBookList);
	};

	const addToSpellBook = async (spellBookID) => {
		await SpellBookSpellService.post({
			spell_book_id: spellBookID,
			spell_id: props.spellID,
        });
        loadSpellBooks();
	};

	const removeFromSpellBook = async (spellBookID) => {
		await SpellBookSpellService.delete({
			spell_book_id: spellBookID,
			spell_id: props.spellID,
        });
        loadSpellBooks();
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
						return (
							<div key={key} className="spell-book-modal-row">
								<span className="spell-book-modal-text">{spellBook.spell_book_name}</span>
								{spellBook.containsSpell ? (
									<Button
                                        variant="outline-danger"
                                        className="add-remove-button"
										onClick={() =>
											removeFromSpellBook(
												spellBook.spell_book_id
											)
										}
									>
										-
									</Button>
								) : (
									<Button
                                        variant="outline-success"
                                        className="add-remove-button"
										onClick={() =>
											addToSpellBook(
												spellBook.spell_book_id
											)
										}
									>
										+
									</Button>
								)}
							</div>
						);
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
