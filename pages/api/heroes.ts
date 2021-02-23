// Fake heroes data
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../utils/mongodb'

export interface Hero {
	_id: string
	password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Get data from your database
	const client = await connectToMongoDB()
	const heroesCollection = client.db('vision').collection('heroes')
	const heroes = await heroesCollection.find({}).toArray()

	res.status(200).json(heroes)
}
