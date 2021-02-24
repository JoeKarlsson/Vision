// Fake heroes data
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../utils/mongodb'

export interface MissionData {
	_id: number
	description: string
	isComplete: boolean
	owners: string[]
}

const newMission = {
	description: 'Complete the super powered todo app, Vision, for the MongoDB 2021 Buildfest.',
	isComplete: false,
	owners: ['Joe', 'Neal'],
}

const missions = [
	{ _id: 1, ...newMission },
	{ _id: 2, ...newMission },
	{ _id: 3, ...newMission },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse<MissionData[]>) {
	// Get data from your database
	const client = await connectToMongoDB()
	try {
		// just a test to prove DB access
		await client.db('vision').collection('missions').insertOne(newMission)
		await client.db('vision').collection('missions').removeOne(newMission)
	} catch (e) {
		console.log(e)
	}
	res.status(200).json(missions)
}
