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
		default:
			res.setHeader('Allow', ['GET'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
