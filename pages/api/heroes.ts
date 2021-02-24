// Fake heroes data

import { NextReq, NextRes } from '../../utils/mongodb'

export interface Hero {
	_id: string
	password: string
}

export default async function handler(req: NextReq, res: NextRes) {
	// Get data from your database
	const heroesCollection = req.mdb.heroes
	const heroes = await heroesCollection.find({}).toArray()

	res.status(200).json(heroes)
}
