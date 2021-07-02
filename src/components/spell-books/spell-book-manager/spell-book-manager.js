import React, { useState, useEffect } from 'react';
import { SpellBookService } from '../../../utils/services';
import Button from 'react-bootstrap/Button';
import { SelectBox } from '../../generic';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './spell-book-manager.css';
// TODO add state into component
export default function SpellBookManager(props) {
    const [spellBookList, setSpellBookList] = useState([]);
    const [spellBookName, setSpellBookName] = useState('');
    const [currentSpellBookID, setCurrentSpellBookID] = useState(0);
    const [spellBookDescription, setSpellBookDescription] = useState('');
    const [genericSpellBookList, setGenericSpellBookList] = useState([]);

    const loadSpellBooks = (spellID) => {
        async function load() {
            const spellBooks = await SpellBookService.get();
            const genericSpellBooks = spellBooks.map((spellBook) => {
                return {
                    name: spellBook.spell_book_name,
                    value: spellBook.spell_book_id
                };
            });
            setGenericSpellBookList(genericSpellBooks);
            setSpellBookList(spellBooks);
            applySpellBook(spellID, spellBooks);
        }
        load();
    };

    const applySpellBook = (spellID, spellBooks) => {
        spellID = parseInt(spellID, 10);
        let spellBook = spellBookList.find((sb) => sb.spell_book_id === spellID);
        if(spellBooks) {
            spellBook = spellBooks.find((sb) => sb.spell_book_id === spellID);
        }
        if(spellBook) {
            setSpellBookName(spellBook.spell_book_name);
            setSpellBookDescription(spellBook.spell_book_description);
            setCurrentSpellBookID(spellBook.spell_book_id);
            if(props.callback) {
                props.callback(spellBook.spell_book_id);
            }
        } else {
            setSpellBookName('');
            setSpellBookDescription('');
            setCurrentSpellBookID(0);
            props.callback(false);
        }
        
    };

    const saveSpellBook = async () => {
        const spellBook = {
            spell_book_id: currentSpellBookID,
            spell_book_name: spellBookName,
            spell_book_description: spellBookDescription
        };
        if(currentSpellBookID === 0) {
            // post
           const response = await SpellBookService.post(spellBook);
           loadSpellBooks(response.insertId);
        } else {
            //put
            await SpellBookService.put({spell_book_id: currentSpellBookID},
                {spell_book_name: spellBookName,
                spell_book_description: spellBookDescription});
                loadSpellBooks();
        }

    };

    const deleteSpellBook = async () => {
        if(currentSpellBookID !== 0) {
            await SpellBookService.delete({spell_book_id: currentSpellBookID});
            setCurrentSpellBookID(0);
            loadSpellBooks();
        }
    };

    const updateName = (ev) => {
        setSpellBookName(ev.target.value);
    };

    const updateDescription = (ev) => {
        setSpellBookDescription(ev.target.value);
    };

    useEffect(loadSpellBooks, []);

    return (
        <div className='spell-book-manager'>
           <div className="spell-book-select">
                <SelectBox list={genericSpellBookList} noneOption={true} onChange={applySpellBook} value={`${currentSpellBookID}`}></SelectBox>
           </div>
           <Form.Control className="spell-book-name" type="text" placeholder="Spell Book Name" value={spellBookName} onChange={updateName}></Form.Control>
           <Form.Control className="spell-book-desc" as="textarea" placeholder="Spell Book Description" rows="3" value={spellBookDescription} onChange={updateDescription}></Form.Control>
           <Button className="spell-book-save" variant="outline-success" onClick={saveSpellBook}>Save</Button>
           <Button className="spell-book-delete" variant="outline-danger" onClick={deleteSpellBook}>Delete</Button>
        </div>
    );
}
SpellBookManager.propTypes = {
    callback: PropTypes.func
};
