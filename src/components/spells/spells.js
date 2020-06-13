import React, { useState, useEffect } from 'react';
import {
	SpellService,
	SchoolService,
	DamageTypeService,
	ComponentTypeService,
} from '../../utils/services';
import Accordion from 'react-bootstrap/Accordion';
import './spells.css';
import SpellCard from './spellCard/spellCard';
import ComponentTypes from './component-types/component-types';
import DamageTypes from './damage-types/damage-types';
import LevelList from '../generic/level-list/level-list';
import ClassList from '../generic/class-list/class-list';
import EasyAccorion from '../generic/easy-accordion/easy-accordion';

/**
 * A component that lists the spells
 * @param {React.Props} props
 */
function Spells(props) {
	const [damageTypeList, setDamageTypes] = useState({});
	const [spellList, setSpellList] = useState([]);
	const [damageTypeFilter, setDamageTypeFilter] = useState('0');
	const [componentTypeFilter, setComponentTypeFilter] = useState([]);
	const [levelFilter, setLevelFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);
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
	 * Filters the spell list based on the damageTypeFilter and componentTypeFilter
	 */
	const filterSpells = () => {
		let visibleSpells = spellList;
		if (isNaN(damageTypeFilter)) {
			visibleSpells = spellList.filter((spell) => {
				return spell.damage_types.includes(damageTypeFilter);
			});
		}
		visibleSpells = visibleSpells.filter((spell) => {
			for (const compType of spell.component_types) {
				if (!componentTypeFilter.includes(compType)) {
					return false;
				}
			}
			return true;
		});
		visibleSpells = visibleSpells.filter((spell) => {
			if (levelFilter.length === 0) {
				return true;
			}
			return levelFilter.includes(spell.spell_level);
		});

		// ON^2 fix with hash map
		visibleSpells = visibleSpells.filter((spell) => {
			if (classFilter.length === 0) {
				return true;
			}
			for (const cl of spell.classes) {
				if (classFilter.includes(cl)) {
					return true;
				}
			}
		});

		setVisibleSpellList(visibleSpells);
	};

	/**
	 * Sets the DamageTypeFilter which calls filterSpells
	 * @param {Event} event
	 */
	const filterByDamageType = (event) => {
		const dt = event.target.value;
		setDamageTypeFilter(dt);
	};

	/**
	 * Sets the componentTypeFilter which calls filterSpells
	 * @param {Event} event
	 */
	const filterComponentType = (event) => {
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

	/**
	 * gets the selected elements in the level select box and sets the level filter
	 * @param {*} event
	 */
	const filterByLevel = (event) => {
		let selectedValues = levelFilter;
		const value = parseInt(event.target.value, 10);
		if (event.target.checked) {
			selectedValues.push(value);
		} else {
			selectedValues = selectedValues.filter((level) => {
				return level !== value;
			});
		}
		setLevelFilter([...selectedValues]);
	};

	const filterByClass = (event) => {
		let selectedValues = classFilter;
		const value = event.target.value;
		if (event.target.checked) {
			selectedValues.push(value);
		} else {
			selectedValues = selectedValues.filter((level) => {
				return level !== value;
			});
		}
		setClassFilter([...selectedValues]);
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
	]);

	return (
		<div>
			<div className="filter">
				<div className="filter-options-container">
					<div className="component-types-grid">
						<EasyAccorion title="Advanced">
							<div className="advanced-grid">
								<span>Component Types</span>
								<span>Damage Types</span>
								<ComponentTypes
									onChange={filterComponentType}
									filter={componentTypeFilter}
									componentTypeList={componentTypeList}
								/>
								<DamageTypes onChange={filterByDamageType} />
							</div>
						</EasyAccorion>
					</div>
					<div className="damage-types-grid">
					</div>
					<div className="level-list-grid">
						<EasyAccorion
							title="Level"
							alwaysOpen={true}
							defaultOpen={true}
						>
							<LevelList onChange={filterByLevel} />
						</EasyAccorion>
					</div>
					<div className="class-list-grid">
						<EasyAccorion
							title="Classes"
							alwaysOpen={true}
							defaultOpen={true}
						>
							<ClassList onChange={filterByClass} />
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
						></SpellCard>
					);
				})}
			</Accordion>
		</div>
	);
}

export default Spells;
