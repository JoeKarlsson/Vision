import { ObjectId } from 'mongodb'
import { NextReq, NextRes } from '../../../utils/mongodb'

export default async function handler(req: NextReq, res: NextRes) {
	const missions = req.mdb.missions
	const {
		query: { id },
		method,
	} = req

	const _id = new ObjectId(id)

	switch (method) {
		case 'GET':
			// Get data from your database
			let query = { _id }
			let mission = await missions.findOne(query)

			if (!mission) {
				// There was no matching mission
				return res.status(404).json({ message: `Mission not found` })
			}

			res.status(200).json({ mission })
			break
		case 'POST': {
			const query = { _id }
			const { isComplete } = JSON.parse(await req.body)
			res.status(200).json(await missions.findOneAndUpdate(query, { $set: { isComplete } }))
			break
		}
		case 'DELETE':
			// Delete mission from your database
			query = { _id }
			mission = await missions.deleteOne(query)

			if (!mission) {
				// There was no matching mission
				return res.status(404).json({ message: `Mission not found` })
			}

			res.status(200).json({ mission })
			break
		default:
			res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
