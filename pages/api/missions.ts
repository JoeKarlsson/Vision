// Fake heroes data
import { NextReq, NextRes } from '../../utils/mongodb'

export interface MissionData {
	_id: number
	description: string
	isComplete: boolean
	owners: string[]
}

export default async function handler(req: NextReq, res: NextRes) {
	const missionsCollection = req.mdb.missions
	const {
		query: { _id },
		body,
		method,
	} = req

	switch (method) {
		case 'GET':
			// Get all missions from your database
			const query = {}
			const missions = await missionsCollection.find(query).toArray()

			if (!missions) {
				// There was no matching mission
				return res.status(404).json({ message: `Mission not found` })
			}

			res.status(200).json(missions)
			break
		case 'POST':
			// Update or create a missions in your database
			try {
				const newMission = {
					description: body.data.description,
					isComplete: false,
					owners: ['Joe', 'Neal'],
				}
				const insertRes = await missionsCollection.insertOne(newMission)

				res.status(200).json(insertRes)
				return
			} catch {
				res.status(200).json({})
			}
			break
		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
