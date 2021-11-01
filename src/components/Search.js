import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ handleSearchNote }) => {
	const [searchKey, setSearchKey] = useState('')

	const handleClearSearch = e => {
		e.preventDefault();
		handleSearchNote(false)
		setSearchKey("");
	}

	const handleInput = e => {
		setSearchKey(e.target.value);
		if(e.target.value == "") {
			handleSearchNote(false);
		}
	}

	const handleSearchSubmit = e => {
		e.preventDefault();
		handleSearchNote(searchKey)
	} 

	return (
		<form onSubmit={handleSearchSubmit}>
		<div className='search'>
			<div className='search-box'>
				<MdSearch className='search-icons' size='1.3em' />
				<input
					onChange={handleInput}
					type='text'
					placeholder='Search...'
					value={searchKey}
					/>
				{
					searchKey &&
					<a href="#" onClick={handleClearSearch} style={{fontSize:14}} className="search-clear">Clear</a>
				}
			</div>
			<button
				className='search-btn'
				onClick={handleSearchSubmit}>
				Search
			</button>
		</div>
		</form>
	)
}

export default Search
