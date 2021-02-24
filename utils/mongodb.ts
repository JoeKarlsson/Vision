import { Collection, MongoClient } from 'mongodb'

const { MONGODB_URI = 'mongodb://localhost:27017' } = process.env

import type { NextApiRequest, NextApiResponse } from 'next'

export interface NextApiRequestWithMongoDB extends NextApiRequest {
	mdb: {
		client: MongoClient
		missions: Collection
		heroes: Collection
	}
}
export type NextApiResponseWithMongoDB = NextApiResponse

export type NextReq = NextApiRequestWithMongoDB
export type NextRes = NextApiResponseWithMongoDB

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const client = new MongoClient(MONGODB_URI)

export async function connectToMongoDB(): Promise<MongoClient> {
	if (client.isConnected() === false) {
		await client.connect()
	}
	return client
}
