import React from 'react'
import styles from '../styles/layout.module.scss'
import { connectToMongoDB } from '../utils/mongodb'
import { GetServerSideProps } from 'next'
import useSwr from 'swr'
import Layout from '../components/layout'
import NewMission from '../components/NewMission'
import { MissionData } from './api/missions'
import { Hero } from './api/heroes'
import Changes from '../components/changes'
import Code from '@leafygreen-ui/code'

const fetcher = async (url) => await (await fetch(url)).json()

export default function Home({ hero }) {
	const { data: missionsData = [], error: missionsError } = useSwr<MissionData[]>('/api/missions', fetcher)

	if (missionsError) return <div>Failed to load data</div>
	if (!missionsData) return <div>Loading...</div>

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

			<h2 className={styles.title}>Missions</h2>
			<NewMission />
			<ul>
				{missionsData.map((mission, index) => (
					<li key={mission._id}>{`Mission ${index + 1}: ${mission.description}`}</li>
				))}
			</ul>

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
		console.log(`cookie is set to: ${JSON.stringify(req.cookies)}`)
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
