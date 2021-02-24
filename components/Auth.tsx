import React from 'react'
import { Hero } from '../pages/api/heroes'
import TextInput from '@leafygreen-ui/text-input'
import Button from '@leafygreen-ui/button'

const Auth: React.FC<{ hero: Hero }> = ({ hero }) => {
	if (hero) {
		// Logged in
		return (
			<div>
				<span>Logged in as {hero._id}</span>
				<Button
					onClick={async () => {
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
				<TextInput label="🦸" name="name" type="text" placeholder="Your hero name..."></TextInput>
				<TextInput label="🔐" name="password" type="text" placeholder="Your hero password..."></TextInput>
				<Button type="submit">Login!</Button>
			</form>
		)
	}
}

export default Auth
