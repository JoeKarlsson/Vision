import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { connectToMongoDB } from '../utils/mongodb';

export default function Home({ isConnected }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{isConnected ? (
				<h2 className="subtitle">You are connected to MongoDB!!!!</h2>
			) : (
				<h2 className="subtitle">
					You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
				</h2>
			)}
		</div>
	);
}

export async function getServerSideProps(context): Promise<{ props: { isConnected: boolean } }> {
	const client = await connectToMongoDB();

	return {
		props: { isConnected: client.isConnected() },
	};
}
