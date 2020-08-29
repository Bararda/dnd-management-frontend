import React, { useState, useEffect } from 'react';
import {
	SpellService,
	ComponentTypeService,
	SpellBookSpellService,
} from '../../utils/services';
import './spells.css';
import ComponentTypes from './component-types/component-types';
import DamageTypes from './damage-types/damage-types';
import LevelList from '../generic/level-list/level-list';
import ClassList from '../generic/class-list/class-list';
import EasyAccorion from '../generic/easy-accordion/easy-accordion';
import SearchBox from '../generic/search-box/search-box';
import SpellBookManager from '../spell-books/spell-book-manager/spell-book-manager';
import SpellList from './spell-list/spell-list';
import SchoolList from './school-list/school-list';
/**
 * A component that lists the spells
 * @param {React.Props} props
 */
function Spells(props) {
	const [spellList, setSpellList] = useState([]);
	const [textFilter, setTextFilter] = useState('');
	const [damageTypeFilter, setDamageTypeFilter] = useState('0');
	const [componentTypeFilter, setComponentTypeFilter] = useState([]);
	const [levelFilter, setLevelFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);
	const [spellBookFilter, setSpellBookFilter] = useState(false);
	const [componentTypeList, setComponentTypes] = useState([]);
	const [visibleSpellList, setVisibleSpellList] = useState([]);
	const [schoolFilter, setSchoolFilter] = useState([]);
	/**
	 * Loads the spell list data and calls the initialization function
	 */
	const loadSpellListData = () => {
		Promise.all([
			SpellService.getSpells(),
			ComponentTypeService.getComponentTypes(),
		]).then(initializeSpellList);
	};

	/**
	 * Initially sets the react components state. Called on inital load
	 * @param {Array} dataList list of data objects returned from loading the spell list data
	 */
	const initializeSpellList = ([spells, componentTypes]) => {
		const list = [];
		for (const compType of componentTypes) {
			list.push(compType.component_type_name);
		}

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
		visibleSpells = filterBySchool(visibleSpells);
		filterBySpellBook(visibleSpells).then((visibleSpells) => {
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
		// 0n^2 slowest
		if (componentTypeFilter.length !== 3) {
			const componentTypeSet = new Set(componentTypeFilter);
			visibleSpells = visibleSpells.filter((spell) => {
				for (const compType of spell.component_types) {
					if (!componentTypeSet.has(compType)) {
						return false;
					}
				}
				return true;
			});
		}
		return visibleSpells;
	};

	const filterByLevel = (visibleSpells) => {
		if (levelFilter.length > 0) {
			const levelSet = new Set(levelFilter);
			visibleSpells = visibleSpells.filter((spell) => {
				return levelSet.has(spell.spell_level);
			});
		}
		return visibleSpells;
	};

	const filterByClass = (visibleSpells) => {
		// 0n^2 slow
		if (classFilter.length > 0) {
			const classSet = new Set(classFilter);
			visibleSpells = visibleSpells.filter((spell) => {
				for (const cl of spell.classes) {
					if (classSet.has(cl)) {
						return true;
					}
				}
				return false;
			});
		}
		return visibleSpells;
	};

	const filterBySchool = (visibleSpells) => {
		if (schoolFilter.length > 0) {
			const schoolSet = new Set(schoolFilter);
			visibleSpells = visibleSpells.filter((spell) => {
				if (schoolSet.has(spell.school_id)) {
					return true;
				}
				return false;
			});
		}
		return visibleSpells;
	};

	const filterBySearchBox = (visibleSpells) => {
		if (textFilter) {
			// 0n^2 slow
			visibleSpells = visibleSpells.filter((spell) => {
				if (spell.spell_name.toLowerCase().indexOf(textFilter) !== -1) {
					return true;
				}
				return false;
			});
		}
		return visibleSpells;
	};

	const filterBySpellBook = async (visibleSpells) => {
		if (spellBookFilter) {
			const spellBookSpells = await SpellBookSpellService.get({
				spell_book_id: spellBookFilter,
			});
			const spellBookSpellIds = spellBookSpells.map(
				(sbs) => sbs.spell_id
			);
			const spellBookIdSet = new Set(spellBookSpellIds);
			visibleSpells = visibleSpells.filter((spell) => {
				return spellBookIdSet.has(spell.spell_id);
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

	const setFilteredSchools = (schools) => {
		setSchoolFilter([...schools]);
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
		spellBookFilter,
		schoolFilter,
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
								<span>Schools</span>
								<ComponentTypes
									onChange={setFilteredComponentType}
									filter={componentTypeFilter}
									componentTypeList={componentTypeList}
								/>
								<DamageTypes onChange={setFilteredDamageType} />
								<SchoolList onChange={setFilteredSchools} />
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
							<SpellBookManager
								callback={setFilteredSpellbook}
							></SpellBookManager>
						</EasyAccorion>
					</div>
				</div>
			</div>
			<SpellList
				spellList={visibleSpellList}
				filterSpells={filterSpells}
			/>
		</div>
	);
}

export default Spells;
