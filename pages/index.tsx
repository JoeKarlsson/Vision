import React from 'react'
import styles from '../styles/layout.module.scss'
import { connectToMongoDB } from '../utils/mongodb'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import useSwr from 'swr'
import Layout from '../components/layout'

const fetcher = async (url) => await (await fetch(url)).json()

export default function Home({ isConnected }) {
	const { data, error } = useSwr<{ _id: number }[]>('/api/heroes', fetcher)

	if (error) return <div>Failed to load hero</div>
	if (!data) return <div>Loading...</div>

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<h1 className={styles.title}>Vision 🦹‍♀️ 🦸 👋</h1>

			<ul>
				{data.map((hero) => (
					<li key={hero._id}>{`Hero ${hero._id}`}</li>
				))}
			</ul>

			<p className={styles.description}>
				{isConnected ? (
					<span>You are connected to mongodb</span>
				) : (
					<span>Something went wrong connecting to mongodb</span>
				)}
			</p>
			<p className={styles.description}>
				Click to learn:
				<Link href="/about">
					<a> About</a>
				</Link>
			</p>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const client = await connectToMongoDB()

	return {
		props: { isConnected: client.isConnected() },
	}
}
