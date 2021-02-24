import { NextReq, NextRes } from '../../../utils/mongodb'

export default async function handler(req: NextReq, res: NextRes) {
	const missions = req.mdb.missions
	const {
		query: { _id, description },
		method,
	} = req

	console.log(req)

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
			res.setHeader('Allow', ['GET', 'DELETE'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
