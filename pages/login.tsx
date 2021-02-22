import React from 'react'
import Layout from '../components/layout'

const LoginPage: React.FC = () => (
	<Layout title="Login | Create your hero here!!">
		<div>
			<input type="text" placeholder="Your hero name..."></input>
			<input type="text" placeholder="Your hero password..."></input>
			<button type="submit">Create New Hero!</button>
		</div>
	</Layout>
)

export default LoginPage
