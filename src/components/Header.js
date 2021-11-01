import React from 'react'

const Header = ({ handleToggleDarkMode, darkMode }) => {
	return (
		<div className='header'>
			<h1>Notes</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='round-button'
			>
				{darkMode? 
					<img src={process.env.PUBLIC_URL+ '/dark-mode.png'} width={20}/>
				:	<img src={process.env.PUBLIC_URL+ '/light-mode.png'} width={20}/> 
				}
			</button>
		</div>
	)
}

export default Header
