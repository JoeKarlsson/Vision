import { ObjectId } from 'mongodb'
import { NextReq, NextRes } from '../../../utils/mongodb'

export default async function handler(req: NextReq, res: NextRes) {
	const missions = req.mdb?.missions
	const {
		query: { id },
		method,
	} = req

	const _id = new ObjectId(id as string)

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
			const { isComplete, completedBy } = JSON.parse(req.body)
			const query = { _id }
			const session = req.mdb.client.startSession()
			try {
				await session.withTransaction(async () => {
					const currentMissionState = await missions.findOne(query)
					if (typeof currentMissionState.completedBy === 'string') {
						await session.abortTransaction()
						return res.status(400).json({ message: `Already completed by ${currentMissionState.completedBy}!` })
					}
					const updateResults = await missions.updateOne(query, { $set: { isComplete, completedBy } })
					if (updateResults.modifiedCount === 0) {
						await session.abortTransaction()
						return res.status(400).json({ message: `Failed to update mission!` })
					}
					res.status(200).json({ success: true })
				})
			} finally {
				await session.endSession()
			}
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
