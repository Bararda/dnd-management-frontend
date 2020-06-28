import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import SpellBookModal from '../../spell-books/spell-book-modal/spell-book-modal';
import SpellCard from '../spell-card/spell-card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './spell-list.css';
import { SchoolService } from '../../../utils/services';

export default function SpellList(props) {
	const [modalShow, setModalShow] = useState(false);
	const [modalSpell, setModalSpell] = useState(null);
	const [schoolList, setSchoolList] = useState({});
	const darkMode =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;
	const openModal = (spellID) => {
		setModalSpell(spellID);
		setModalShow(true);
	};

	createTheme('darker', {
		text: {
			primary: '#FFFFFF',
			secondary: '#CDCDCD',
		},
		background: {
			default: '#242425',
		},
		context: {
			background: '#cb4b16',
			text: '#FFFFFF',
		},
		divider: {
			default: '#1F1F20',
		},
		highlightOnHover: {
			default: '#1F1F20',
			text: '#FFFFFF',
		},
		action: {
			button: 'rgba(0,0,0,.54)',
			hover: 'rgba(0,0,0,.08)',
			disabled: 'rgba(0,0,0,.12)',
		},
		striped: {
			default: 'rgba(0, 0, 0, .05)',
			text: '#FFFFFF',
		},
	});

	/**
	 * Loads the spell list data and calls the initialization function
	 */
	const loadDamagesTypesAndSchools = () => {
		Promise.all([SchoolService.getSchools()]).then(setDTAndSchools);
	};

	const setDTAndSchools = ([schools]) => {
		const schoolObj = {};
		for (const school of schools) {
			schoolObj[school.school_id] = school.school_name;
		}
		setSchoolList(schoolObj);
	};

	const feetPerMile = 5280;
	const columns = [
		{
			name: 'Spell Name',
			selector: 'spell_name',
			sortable: true,
		},
		{
			name: 'Level',
			selector: 'spell_level',
            sortable: true,
            hide: 'sm',
		},
		{
			name: 'Range',
			selector: 'spell_range',
            sortable: true,
            hide: 'sm',
			sortFunction: (spellA, spellB) => {
                if(spellA.spell_range === spellB.spell_range) {
                    return 0;
                }
				if (
					spellA.spell_range.includes('Self') &&
					spellB.spell_range.includes('Self')
				) {
					return 0;
				}
				if (spellA.spell_range.includes('Self')) {
					return -1;
				}
				if (spellB.spell_range.includes('Self')) {
					return 1;
				}
				if (spellA.spell_range === 'Touch') {
					return -1;
				}
				if (spellB.spell_range === 'Touch') {
					return 1;
                }
                //reversed because unlimited and special and sight are big (unlimited last, then special, then sight)
                if(spellA.spell_range === 'Unlimited') {
                    return 1;
                }
                if(spellB.spell_range === 'Unlimited') {
                    return -1;
                }
                if(spellA.spell_range === 'Special') {
                    return 1;
                }
                if(spellB.spell_range === 'Special') {
                    return -1;
                }
                if(spellA.spell_range === 'Sight') {
                    return 1;
                }
                if(spellB.spell_range === 'Sight') {
                    return -1;
                }


				let spellARange = parseInt(spellA.spell_range, 10);
				let spellBRange = parseInt(spellB.spell_range, 10);
				if (spellA.spell_range.includes('mile')) {
					spellARange = spellARange * feetPerMile;
				}
				if (spellB.spell_range.includes('mile')) {
					spellBRange = spellBRange * feetPerMile;
				}
				if (spellARange < spellBRange) {
					return -1;
                }
                if (spellARange > spellBRange) {
                    return 1;
                }
                return 0;
			},
		},
		{
			cell: function SpellModalButton(row) {
				return (
					<Button
						variant="outline-dark"
						onClick={() => {
							openModal(row.spell_id);
						}}
					>
						+
					</Button>
				);
			},
			button: true,
		},
	];

	useEffect(loadDamagesTypesAndSchools, []);

	return (
		<div className="spell-list" style={{width:'100%'}}>
			<DataTable
				title="Spell List"
				columns={columns}
				data={props.spellList}
				expandableRows
				expandOnRowClicked
				expandableRowsComponent={<SpellCard schoolList={schoolList} />}
				theme={darkMode ? 'darker' : 'default'}
				conditionalRowStyles={conditionalRowStyles}
                highlightOnHover
                pagination
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50, 100, 200, 500]}
			/>
			<SpellBookModal
				show={modalShow}
				onHide={() => {
					props.filterSpells();
					setModalShow(false);
				}}
				spellID={modalSpell}
			></SpellBookModal>
		</div>
	);
}

SpellList.propTypes = {
	spellList: PropTypes.array.isRequired,
	filterSpells: PropTypes.func.isRequired,
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

const conditionalRowStyles = [
	{
		when: (spell) =>
			spell.damage_types.length > 0 && spell.damage_types[0] === 'acid',
		style: {
			borderLeft: `3px solid ${COLORS.acid}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 && spell.damage_types[0] === 'fire',
		style: {
			borderLeft: `3px solid ${COLORS.fire}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'lightning',
		style: {
			borderLeft: `3px solid ${COLORS.lightning}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'thunder',
		style: {
			borderLeft: `3px solid ${COLORS.thunder}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'bludgeoning',
		style: {
			borderLeft: `3px solid ${COLORS.bludgeoning}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'slashing',
		style: {
			borderLeft: `3px solid ${COLORS.slashing}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'piercing',
		style: {
			borderLeft: `3px solid ${COLORS.piercing}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 && spell.damage_types[0] === 'cold',
		style: {
			borderLeft: `3px solid ${COLORS.cold}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 && spell.damage_types[0] === 'force',
		style: {
			borderLeft: `3px solid ${COLORS.force}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'necrotic',
		style: {
			borderLeft: `3px solid ${COLORS.necrotic}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 && spell.damage_types[0] === 'poison',
		style: {
			borderLeft: `3px solid ${COLORS.poison}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'radiant',
		style: {
			borderLeft: `3px solid ${COLORS.radiant}`,
		},
	},
	{
		when: (spell) =>
			spell.damage_types.length > 0 &&
			spell.damage_types[0] === 'psychic',
		style: {
			borderLeft: `5px solid ${COLORS.psychic}`,
		},
	},
	{
		when: (spell) => spell.damage_types.length === 0,
		style: {
			borderLeft: '1px solid #1F1F20',
		},
	},
];
