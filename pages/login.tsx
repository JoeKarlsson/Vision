import React from 'react'
import Layout from '../components/layout'

const LoginPage: React.FC = () => (
	<Layout title="Login | Create your hero here!!">
		<form action="api/login" method="POST">
			<label htmlFor="name">🦸‍♂️:</label>
			<input name="name" type="text" placeholder="Your hero name..."></input>
			<label htmlFor="password">👺:</label>
			<input name="password" type="text" placeholder="Your hero password..."></input>
			<button type="submit">Create New Hero!</button>
		</form>
	</Layout>
)

export default LoginPage
