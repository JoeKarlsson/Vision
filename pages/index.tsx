import React from 'react'
import styles from '../styles/layout.module.scss'
import { GetServerSideProps } from 'next'
import Layout from '../components/layout'
import Missions from '../components/Missions/Missions'
import { Hero } from './api/heroes'
import Changes from '../components/changes'
import Code from '@leafygreen-ui/code'

export default function Home({ hero }) {
	const heroJSON = JSON.stringify({ hero })
	return (
		<Layout title="Home | Vision" hero={hero}>
			<h1 className={styles.title}>🦹‍♀️ Vision 🦸</h1>

			{hero ? (
				<>
					<h2 className={styles.title}>My Hero</h2>
					<Code language="json" copyable={false}>
						{heroJSON}
					</Code>
				</>
			) : (
				<h4 className={styles.title}>Welcome! Login to make missions</h4>
			)}

			{hero ? <Missions /> : <span>Please login to view your Missions</span>}

			<Changes />
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-expect-error
	const heroes = req.mdb.heroes

	let hero: Hero | null = null

	if (req.cookies.heroName) {
		hero = (await heroes.findOne({ _id: req.cookies.heroName })) as Hero
		if (hero) {
			console.log(`User is logged in as ${JSON.stringify(hero)}`)
		} else {
			hero = null // JSON cannot serialize undefined
			console.log(`User is not logged in`)
		}
	}
	return {
		props: { hero },
	}
}
