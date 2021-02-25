import React from 'react'
import { Hero } from '../pages/api/heroes'
import Button from '@leafygreen-ui/button'

const Auth: React.FC<{ hero: Hero }> = ({ hero }) => {
	if (hero) {
		// Logged in
		return (
			<div>
				<Button
					variant="primary"
					onClick={() => {
						document.cookie = 'heroName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
						location.reload()
					}}
				>
					Logout!
				</Button>
			</div>
		)
	} else {
		// Logged out
		return (
			<form action="api/login" method="POST">
				<label htmlFor="name">🦸 </label>
				<input name="name" type="text" placeholder="Your hero name..."></input>
				<label htmlFor="password">🔐 </label>
				<input name="password" type="text" placeholder="Your hero password..."></input>
				<Button type="submit">Login!</Button>
			</form>
		)
	}
}

export default Auth
