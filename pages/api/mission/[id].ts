import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const client = await connectToMongoDB()
	const missions = client.db('vision').collection('missions')
	const {
		query: { _id, description },
		method,
	} = req

	console.log(req)

	switch (method) {
		case 'GET':
			// Get data from your database
			const query = { _id }
			const mission = await missions.findOne(query)

			if (!mission) {
				// There was no matching mission
				return res.status(404).json({ message: `Mission not found` })
			}

			res.status(200).json({ mission })
			break
		case 'POST':
			// Update or create a mission in your database

			try {
				const newMission = {
					description,
					isComplete: false,
					owners: ['Joe', 'Neal'],
				}

				const insertRes = await missions.insertOne(newMission)
				console.log(insertRes)

				res.status(200).json(insertRes)
				return
			} catch {
				res.status(200).json({ _id: name, alreadyExists: true })
			}
			break
		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
