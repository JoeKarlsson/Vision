import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/layout.module.scss'

type Props = {
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => (
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
				<Link href="/">Home</Link>
				<Link href="/login">Login / Create Hero</Link>
				<Link href="/about">About</Link>
			</nav>
			<hr />
		</header>
		<main className={styles.main}>{children}</main>
		<footer className={styles.footer}>
			<hr />
			<span>I&apos;m here to stay (Footer)</span>
		</footer>
	</div>
)

export default Layout
