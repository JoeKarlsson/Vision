import React from 'react'
import { Hero } from '../pages/api/heroes'

const Auth: React.FC<{ hero: Hero }> = ({ hero }) => {
	if (hero) {
		// Logged in
		return (
			<div>
				<span>Logged in as {hero._id}</span>
				<button
					onClick={async () => {
						document.cookie = 'heroName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
						location.reload()
					}}
				>
					Logout
				</button>
			</div>
		)
	} else {
		// Logged out
		return (
			<form action="api/login" method="POST">
				<label htmlFor="name">🦸‍♂️ </label>
				<input name="name" type="text" placeholder="Your hero name..."></input>
				<label htmlFor="password">🔐 </label>
				<input name="password" type="text" placeholder="Your hero password..."></input>
				<button type="submit">Create New Hero!</button>
			</form>
		)
	}
}

export default Auth
