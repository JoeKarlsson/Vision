import React from 'react'
import styles from '../styles/layout.module.scss'
import { motion } from 'framer-motion'
import { connectToMongoDB } from '../utils/mongodb'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import useSwr from 'swr'
import Layout from '../components/layout'
import Missions from '../components/Missions/Missions'
import { Hero } from './api/heroes'
import Changes from '../components/changes'

const fetcher = async (url) => await (await fetch(url)).json()

export default function Home({ isConnected, hero }) {
	const { data: heroesData, error: heroesError } = useSwr<Hero[]>('/api/heroes', fetcher)

	if (heroesError) return <div>Failed to load data `${heroesError}`</div>
	if (!heroesData) return <div>Loading...</div>

	return (
		<Layout title="Home | Vision" hero={hero}>
			<h1 className={styles.title}>Vision 🦹‍♀️ 🦸 👋</h1>

			<h2 className={styles.title}>Heroes</h2>
			<ul>
				{(heroesData ?? []).map((hero, index) => (
					<li key={index}>
						{`Hero: `}
						<code>{JSON.stringify(hero)}</code>
					</li>
				))}
			</ul>

			{hero ? <Missions /> : <span>Please login to view your Missions</span>}

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
	let hero: Hero | null = null

	if (req.cookies.heroName) {
		console.log(`cookie is set to: ${JSON.stringify(req.cookies)}`)
		hero = (await client.db('vision').collection('heroes').findOne({ _id: req.cookies.heroName })) as Hero
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
