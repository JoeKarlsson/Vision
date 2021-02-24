import type { NextApiRequest, NextApiResponse } from 'next'
import { NextReq, NextRes } from '../../../utils/mongodb'

export default async function handler(req: NextReq, res: NextRes) {
	const heroes = req.mdb.heroes
	const {
		query: { name, password },
		method,
	} = req

	switch (method) {
		case 'GET': {
			// Get data from your database
			const hero = await heroes.findOne({ _id: name })

			if (!hero) {
				// There was no matching hero
				return res.status(404).json({ message: `Hero ${name} not found` })
			}

			res.status(200).json(hero)
			break
		}
		case 'POST': {
			// Update or create data in your database
			try {
				const insertRes = await heroes.insertOne({ _id: name, password })
				res.status(200).json({ _id: name, insertRes })
				return
			} catch {
				res.status(200).json({ _id: name, alreadyExists: true })
			}
			break
		}
		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
