// Fake heroes data
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../utils/mongodb'

interface HeroData {
	_id: number
}

const heroes = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]

export default async function handler(req: NextApiRequest, res: NextApiResponse<HeroData[]>) {
	// Get data from your database
	const client = await connectToMongoDB()
	try {
		// just a test to prove DB access
		console.log(await client.db('vision').collection('heroes').insertOne({ _id: 1, name: 'wanda' }))
		console.log(await client.db('vision').collection('heroes').removeOne({ _id: 1 }))
	} catch (e) {
		console.log(e)
	}
	res.status(200).json(heroes)
}
