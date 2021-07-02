import React from 'react';
import TitleText from '../../generic/titleText/titleText';
import PropTypes from 'prop-types';

import './spell-card.css';
function SpellCard(props) {
	return (
		<div className="spell-card">
			<b>{props.data.spell_name}</b>
			<div className="level">
				{ordinal_suffix_of(props.data.spell_level)} level{' '}
				{props.schoolList[props.data.school_id]}
			</div>
			<TitleText
				title="Casting Time"
				text={props.data.casting_time}
			></TitleText>
			<TitleText title="Range" text={props.data.spell_range}></TitleText>
			<TitleText
				title="Components"
				text={
					props.data.components
						? props.data.component_types.join(', ') +
						  ` (${props.data.components})`
						: props.data.component_types.join(', ')
				}
			></TitleText>
			<TitleText
				title="Duration"
				text={`${props.data.concentration ? 'Concentration, ' : ''} ${
					props.data.duration
				}`}
			></TitleText>
			<TitleText
				title="Classes"
				text={props.data.classes.join(', ')}
			></TitleText>
			<div className="spell-description">{props.data.description}</div>
			{props.data.higher_level && (
				<div className="higher-levels">
					<TitleText
						title="Higher Levels"
						text={props.data.higher_level}
					></TitleText>
				</div>
			)}
		</div>
	);
}

SpellCard.propTypes = {
	schoolList: PropTypes.object.isRequired,
	style: PropTypes.object,
	data: PropTypes.object,
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
