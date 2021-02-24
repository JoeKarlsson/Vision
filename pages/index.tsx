import React from 'react'
import styles from '../styles/layout.module.scss'
import { motion } from 'framer-motion'
import { connectToMongoDB } from '../utils/mongodb'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { server as WebSocketServer } from 'websocket'
import useSwr from 'swr'
import Layout from '../components/layout'
import NewMission from '../components/NewMission'
import { MissionData } from './api/missions'
import { Hero } from './api/heroes'
import Changes from '../components/changes'

const fetcher = async (url) => await (await fetch(url)).json()

export default function Home({ isConnected, hero }) {
	const { data: heroesData, error: heroesError } = useSwr<Hero[]>('/api/heroes', fetcher)
	const { data: missionsData, error: missionsError } = useSwr<MissionData[]>('/api/missions', fetcher)

	if (heroesError || missionsError) return <div>Failed to load data `${heroesError}`</div>
	if (!heroesData && !missionsData) return <div>Loading...</div>

	return (
		<Layout title="Home | Vision">
			<h1 className={styles.title}>Vision 🦹‍♀️ 🦸 👋</h1>
			{hero ? (
				<>
					<h5>Logged in as {hero._id}</h5>
					<button
						onClick={async () => {
							document.cookie = 'heroName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
							location.reload()
						}}
					>
						Logout
					</button>
				</>
			) : (
				<h5>It is nice to log in</h5>
			)}

			<h2 className={styles.title}>Heroes</h2>
			<ul>
				{(heroesData ?? []).map((hero, index) => (
					<li key={index}>
						{`Hero: `}
						<code>{JSON.stringify(hero)}</code>
					</li>
				))}
			</ul>

			<h2 className={styles.title}>Missions</h2>
			<NewMission />
			<ul>
				{(missionsData ?? []).map((mission) => (
					<li key={mission._id}>{`Mission ${mission._id}: ${mission.description}`}</li>
				))}
			</ul>

			{isConnected ? (
				<motion.div
					className={styles.description}
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
				>
					You are connected to mongodb
				</motion.div>
			) : (
				<span>Something went wrong connecting to mongodb</span>
			)}

			<Changes />

			<p className={styles.description}>
				Click to learn:
				<Link href="/about">
					<a> About</a>
				</Link>
			</p>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const client = await connectToMongoDB()
	let hero = null

	if (req.cookies.heroName) {
		console.log(`cookie is set to: ${JSON.stringify(req.cookies)}`)
		hero = await client.db('vision').collection('heroes').findOne({ _id: req.cookies.heroName })
		if (hero) {
			console.log(`User is logged in as ${JSON.stringify(hero)}`)
		} else {
			hero = null // JSON cannot serialize undefined
			console.log(`User is not logged in`)
		}
	}
	return {
		props: { isConnected: client.isConnected(), hero },
	}
}
