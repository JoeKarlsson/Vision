import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'

const AboutPage: React.FC = () => (
	<Layout title="About | Vision a ToDo Tracker for heroes">
		<p>Vision a ToDo Tracker for heroes</p>
		<p>
			<Link href="/">
				<a>Go home</a>
			</Link>
		</p>
	</Layout>
)

export default AboutPage
