import React, { useState, useEffect } from 'react';
import {
	SpellService,
	SchoolService,
	DamageTypeService,
	ComponentTypeService,
	SpellBookSpellService
} from '../../utils/services';
import Accordion from 'react-bootstrap/Accordion';
import './spells.css';
import SpellCard from './spellCard/spellCard';
import ComponentTypes from './component-types/component-types';
import DamageTypes from './damage-types/damage-types';
import LevelList from '../generic/level-list/level-list';
import ClassList from '../generic/class-list/class-list';
import EasyAccorion from '../generic/easy-accordion/easy-accordion';
import SearchBox from '../generic/search-box/search-box';
import SpellBookManager from '../spell-books/spell-book-manager/spell-book-manager';

/**
 * A component that lists the spells
 * @param {React.Props} props
 */
function Spells(props) {
	const [damageTypeList, setDamageTypes] = useState({});
	const [spellList, setSpellList] = useState([]);
	const [textFilter, setTextFilter] = useState('');
	const [damageTypeFilter, setDamageTypeFilter] = useState('0');
	const [componentTypeFilter, setComponentTypeFilter] = useState([]);
	const [levelFilter, setLevelFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);
	const [spellBookFilter, setSpellBookFilter] = useState(false);
	const [schoolList, setSchoolList] = useState({});
	const [componentTypeList, setComponentTypes] = useState([]);
	const [visibleSpellList, setVisibleSpellList] = useState([]);

	/**
	 * Loads the spell list data and calls the initialization function
	 */
	const loadSpellListData = () => {
		Promise.all([
			SchoolService.getSchools(),
			SpellService.getSpells(),
			ComponentTypeService.getComponentTypes(),
			DamageTypeService.getDamageTypes(),
		]).then(initializeSpellList);
	};

	/**
	 * Initially sets the react components state. Called on inital load
	 * @param {Array} dataList list of data objects returned from loading the spell list data
	 */
	const initializeSpellList = ([
		schools,
		spells,
		componentTypes,
		damageTypes,
	]) => {
		const schoolObj = {};
		for (const school of schools) {
			schoolObj[school.school_id] = school.school_name;
		}

		const list = [];
		for (const compType of componentTypes) {
			list.push(compType.component_type_name);
		}
		const typeObj = {};

		//convert the list to a hash map for quicker lookup
		for (const type of damageTypes) {
			typeObj[type.damage_type_id] = type.damage_type_name;
		}
		setDamageTypes(typeObj);
		setSchoolList(schoolObj);
		setVisibleSpellList(spells);
		setSpellList(spells);
		setComponentTypes(componentTypes);
		setComponentTypeFilter(list);
	};

	/**
	 * Filters the spell list
	 */
	const filterSpells = () => {
		let visibleSpells = spellList;
		visibleSpells = filterByDamageType(visibleSpells);
		visibleSpells = filterByComponentTypes(visibleSpells);
		visibleSpells = filterByLevel(visibleSpells);
		visibleSpells = filterByClass(visibleSpells);
		visibleSpells = filterBySearchBox(visibleSpells);
		filterBySpellBook(visibleSpells).then(visibleSpells => {
			setVisibleSpellList(visibleSpells);
		});
	};

	const filterByDamageType = (visibleSpells) => {
		if (isNaN(damageTypeFilter)) {
			// 0n^2 slow
			visibleSpells = visibleSpells.filter((spell) => {
				return spell.damage_types.includes(damageTypeFilter);
			});
		}
		return visibleSpells;
	};

	const filterByComponentTypes = (visibleSpells) => {
		// 0n^2 slow
		visibleSpells = visibleSpells.filter((spell) => {
			for (const compType of spell.component_types) {
				if (!componentTypeFilter.includes(compType)) {
					return false;
				}
			}
			return true;
		});
		return visibleSpells;
	};

	const filterByLevel = (visibleSpells) => {
		// 0n^2 slow
		visibleSpells = visibleSpells.filter((spell) => {
			if (levelFilter.length === 0) {
				return true;
			}
			return levelFilter.includes(spell.spell_level);
		});
		return visibleSpells;
	};

	const filterByClass = (visibleSpells) => {
		// 0n^2 slow
		visibleSpells = visibleSpells.filter((spell) => {
			if (classFilter.length === 0) {
				return true;
			}
			for (const cl of spell.classes) {
				if (classFilter.includes(cl)) {
					return true;
				}
			}
			return false;
		});
		return visibleSpells;
	};

	const filterBySearchBox = (visibleSpells) => {
		// 0n^2 slow
		visibleSpells = visibleSpells.filter((spell) => {
			if (textFilter === '') {
				return true;
			}
			if (spell.spell_name.toLowerCase().indexOf(textFilter) !== -1) {
				return true;
			}
			return false;
		});
		return visibleSpells;
	};

	const filterBySpellBook = async (visibleSpells) => {
		if(spellBookFilter) {
			const spellBookSpells = await SpellBookSpellService.get({spell_book_id: spellBookFilter});
			const spellBookSpellIds = spellBookSpells.map(sbs => sbs.spell_id);
			console.log(spellBookSpells);
			visibleSpells = visibleSpells.filter((spell) => {
				return spellBookSpellIds.includes(spell.spell_id);
			});

		}
		return visibleSpells;
	};

	/**
	 * Sets the DamageTypeFilter which calls filterSpells
	 * @param {Event} event
	 */
	const setFilteredDamageType = (event) => {
		const dt = event.target.value.toLowerCase();
		setDamageTypeFilter(dt);
	};

	/**
	 * Sets the componentTypeFilter which calls filterSpells
	 * @param {Event} event
	 */
	const setFilteredComponentType = (event) => {
		let list = componentTypeFilter;
		if (!list.includes(event.target.value)) {
			list[list.length] = event.target.value;
		} else {
			list = list.filter((compType) => {
				return compType !== event.target.value;
			});
		}
		setComponentTypeFilter([...list]);
	};

	const searchSpells = (ev) => {
		const searchText = ev.target.value.toLowerCase();
		setTextFilter(searchText);
	};

	/**
	 * gets the selected elements in the level select box and sets the level filter
	 * @param {*} event
	 */
	const setFilteredLevels = (levels) => {
		setLevelFilter([...levels]);
	};

	const setFilteredClasses = (classes) => {
		setClassFilter([...classes]);
	};

	const setFilteredSpellbook = (spellBookID) => {
		setSpellBookFilter(spellBookID);
	};

	/**
	 * Initial loading for the component
	 */
	useEffect(loadSpellListData, []);

	/**
	 * adds the event listeners to refilter when the damageTypeFilter and componentTypeFilters change
	 */
	useEffect(filterSpells, [
		damageTypeFilter,
		componentTypeFilter,
		levelFilter,
		classFilter,
		textFilter,
		spellBookFilter
	]);

	return (
		<div className="spells-container">
			<SearchBox onChange={searchSpells}></SearchBox>
			<div className="filter">
				<div className="filter-options-container">
					<div className="component-types-grid">
						<EasyAccorion title="Advanced">
							<div className="advanced-grid">
								<span>Component Types</span>
								<span>Damage Types</span>
								<ComponentTypes
									onChange={setFilteredComponentType}
									filter={componentTypeFilter}
									componentTypeList={componentTypeList}
								/>
								<DamageTypes onChange={setFilteredDamageType} />
							</div>
						</EasyAccorion>
					</div>
					<div className="damage-types-grid"></div>
					<div className="level-list-grid">
						<EasyAccorion
							title="Level"
							alwaysOpen={true}
							defaultOpen={true}
						>
							<LevelList onChange={setFilteredLevels} />
						</EasyAccorion>
					</div>
					<div className="class-list-grid">
						<EasyAccorion
							title="Classes"
							alwaysOpen={true}
							defaultOpen={true}
						>
							<ClassList onChange={setFilteredClasses} />
						</EasyAccorion>
					</div>
					<div className="spell-book-grid">
						<EasyAccorion title="Spell Books">
							<SpellBookManager callback={setFilteredSpellbook}></SpellBookManager>
						</EasyAccorion>
					</div>
				</div>
			</div>
			<Accordion defaultActiveKey="0">
				{visibleSpellList.map((spell, i) => {
					return (
						<SpellCard
							key={i}
							spell={spell}
							schoolList={schoolList}
							damageTypeList={damageTypeList}
							filterSpells={filterSpells}
						></SpellCard>
					);
				})}
			</Accordion>
		</div>
	);
}

export default Spells;
