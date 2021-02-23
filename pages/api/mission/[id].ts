import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const client = await connectToMongoDB()
	const missions = client.db('vision').collection('missions')
	const {
		query: { _id, description },
		method,
	} = req

	switch (method) {
		case 'GET':
			// Get data from your database
			const query = { _id };
			const getRes = await missions.findOne(query);
			res.status(200).json({ _id, res: getRes || "no mission found." });
			break
		case 'POST':
			// Update or create data in your database
			const newMission = {
				_id,
				// description: 'Complete the super powered todo app, Vision, for the MongoDB 2021 Buildfest.',
				description,
				isComplete: false,
				owners: ['Joe', 'Neal'],
			}
			const insertRes = await missions.insertOne(newMission)
			res.status(200).json({ ...newMission, insertRes })
			break
		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
