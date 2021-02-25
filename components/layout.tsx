import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { motion } from 'framer-motion'
import styles from '../styles/layout.module.scss'
import { QUOTES } from '../utils/quotes'
import Auth from './Auth'
import { Hero } from '../pages/api/heroes'

type Props = {
	title?: string
	hero: Hero
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title', hero }) => (
	<div className={styles.container}>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1, width=device-width" />
			<link rel="manifest" href="/site.webmanifest" />
			<meta name="theme-color" content="#13aa52" />

			<link rel="apple-touch-icon" href="/favicon_io/icon.png" />
			<link rel="icon" type="image/png" href="/favicon_io/icon.png" />
		</Head>
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link href="/">🦹‍♀️ Vision 🦸</Link>
				<Link href="/about">About</Link>
				<Auth hero={hero} />
			</nav>
		</header>
		<main className={styles.main}>{children}</main>
		<footer className={styles.footer}>
			<motion.span animate={{ y: -10, transition: { duration: 1 } }}>
				{QUOTES[Math.floor(Math.random() * QUOTES.length)]}
			</motion.span>
		</footer>
	</div>
)

export default Layout
