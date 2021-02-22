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
		</Head>
		<header>
			<nav className={styles.nav}>
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/login">
					<a>Login / Create Hero</a>
				</Link>
				<Link href="/about">
					<a>About</a>
				</Link>
			</nav>
		</header>
		<main className={styles.main}>{children}</main>
		<footer className={styles.footer}>
			<hr />
			<span>I'm here to stay (Footer)</span>
		</footer>
	</div>
)

export default Layout
