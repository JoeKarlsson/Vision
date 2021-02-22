import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongoDB } from '../../../utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const client = await connectToMongoDB()
	const heroes = client.db('vision').collection('heroes')
	const {
		query: { _id, name },
		method,
	} = req

	switch (method) {
		case 'GET':
			// Get data from your database
			res.status(200).json({ _id, name: `Hero ${_id}` })
			break
		case 'POST':
			// Update or create data in your database
			const insertRes = await heroes.insertOne({ _id, name, password: 'password' })
			res.status(200).json({ _id, name: name || `Hero: ${_id}`, insertRes })
			break
		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
