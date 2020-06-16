import React from 'react';
import PropTypes from 'prop-types';
import './search-box.css';
export default function SearchBox(props) {
	return (
		<div className="search-box-container">
			<img
				src={require('../../../assets/images/iconmonstr-search-thin.svg')}
				id="search-icon"
				alt="search"
			/>
			<input
				className="search-box"
				type="text"
				onChange={props.onChange}
				placeholder="Search..."
			/>
		</div>
	);
}

SearchBox.propTypes = {
	onChange: PropTypes.func,
};
