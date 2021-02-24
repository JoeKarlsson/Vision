import { MongoClient } from 'mongodb'

const { MONGODB_URI = 'mongodb://localhost:27017' } = process.env
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let client = new MongoClient(MONGODB_URI)
//@ts-expect-error NODE JS global does not have a client prop
global.client = client

export async function connectToMongoDB(): Promise<MongoClient> {
	if (client.isConnected() === false) {
		client = await client.connect()
	}
	return client
}
