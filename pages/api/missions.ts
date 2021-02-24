// Fake heroes data
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../utils/mongodb'

export interface MissionData {
	data: {
		_id: number
		description: string
		isComplete: boolean
		owners: string[]
	}
	error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('hit')
	// Get data from your database
	const client = await connectToMongoDB()
	const missionsCollection = client.db('vision').collection('missions')
	const missions = await missionsCollection.find({}).toArray()

	res.status(200).json(missions)
}
