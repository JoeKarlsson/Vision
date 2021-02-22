import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { connectToMongoDB } from '../utils/mongodb'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home({ isConnected }) {
	const { data, error } = useSwr('/api/users', fetcher)

	if (error) return <div>Failed to load users</div>
	if (!data) return <div>Loading...</div>

	return (
		<div className={styles.container}>
			<ul>
				{data.map((user) => (
					<li key={user._id}>
						<Link href="/user/[id]" as={`/user/${user._id}`}>
							<a>{`User ${user._id}`}</a>
						</Link>
					</li>
				))}
			</ul>

			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				{isConnected ? (
					<h2 className="subtitle">You are connected to MongoDB</h2>
				) : (
					<h2 className="subtitle">
						You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
					</h2>
				)}

				<p className={styles.description}>
					Get started by editing <code className={styles.code}>pages/index.js</code>
				</p>

				<div className={styles.grid}>
					<a href="https://nextjs.org/docs" className={styles.card}>
						<h3>Documentation &rarr;</h3>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className={styles.card}>
						<h3>Learn &rarr;</h3>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
						<h3>Examples &rarr;</h3>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={styles.card}
					>
						<h3>Deploy &rarr;</h3>
						<p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const client = await connectToMongoDB()

	return {
		props: { isConnected: client.isConnected() },
	}
}
