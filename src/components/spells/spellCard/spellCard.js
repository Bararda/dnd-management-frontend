import React, { useState } from 'react';
import TitleText from '../../generic/titleText/titleText';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import SpellBookModal from '../../spell-books/spell-book-modal/spell-book-modal';
import Button from 'react-bootstrap/Button';
import './spellCard.css';
function SpellCard(props) {
	const [modalShow, setModalShow] = useState(false);
	let borderColor = '#1F1F20';

	if (props.spell.damage_types.length > 0) {
		borderColor = COLORS[props.spell.damage_types[0]];
	}
	const border = '5px solid ' + borderColor;

	const openModal = (ev) => {
		ev.stopPropagation();
		ev.preventDefault();
		setModalShow(true);
	};

	return (
		<>
			<Card style={{ borderLeft: border }}>
				<Accordion.Toggle
					as={Card.Header}
					eventKey={props.spell.spell_id}
				>
					{props.spell.spell_name}
                    <div className="spell-book-toggle">
                        <Button variant="outline-dark" onClick={openModal}>
                            +
                        </Button>
                    </div>
				</Accordion.Toggle>

				<Accordion.Collapse eventKey={props.spell.spell_id}>
					<Card.Body>
						<div className="level">
							{ordinal_suffix_of(props.spell.spell_level)} level{' '}
							{props.schoolList[props.spell.school_id]}
						</div>
						<TitleText
							title="Casting Time"
							text={props.spell.casting_time}
						></TitleText>
						<TitleText
							title="Range"
							text={props.spell.spell_range}
						></TitleText>
						<TitleText
							title="Components"
							text={
								props.spell.components
									? props.spell.component_types.join(', ') +
									  ` (${props.spell.components})`
									: props.spell.component_types.join(', ')
							}
						></TitleText>
						<TitleText
							title="Duration"
							text={`${
								props.spell.concentration
									? 'Concentration, '
									: ''
							} ${props.spell.duration}`}
						></TitleText>
						<TitleText
							title="Classes"
							text={props.spell.classes.join(', ')}
						></TitleText>
						<div className="spell-description">
							{props.spell.description}
						</div>
						{props.spell.higher_level && (
							<div className="higher-levels">
								<TitleText
									title="Higher Levels"
									text={props.spell.higher_level}
								></TitleText>
							</div>
						)}
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			<SpellBookModal
				show={modalShow}
				onHide={() => {
                    props.filterSpells();
					setModalShow(false);
				}}
				spellID={props.spell.spell_id}
			></SpellBookModal>
		</>
	);
}
SpellCard.propTypes = {
	spell: PropTypes.object.isRequired,
    schoolList: PropTypes.object.isRequired,
    filterSpells: PropTypes.func.isRequired
};

const COLORS = {
	acid: '#66F462',
	lightning: '#4E55FF',
	fire: '#FF351B',
	thunder: '#FFE24F',
	bludgeoning: '#A4A4A4',
	slashing: '#6d6e6d',
	piercing: '#421d13',
	cold: '#96E0FF',
	force: 'white',
	necrotic: 'black',
	poison: 'purple',
	radiant: '#FFF8CC',
	psychic: '#BCBAF0',
};
function ordinal_suffix_of(i) {
	var j = i % 10,
		k = i % 100;
	if (j === 1 && k !== 11) {
		return i + 'st';
	}
	if (j === 2 && k !== 12) {
		return i + 'nd';
	}
	if (j === 3 && k !== 13) {
		return i + 'rd';
	}
	return i + 'th';
}

export default SpellCard;
