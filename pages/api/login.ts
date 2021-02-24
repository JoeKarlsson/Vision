import { NextReq, NextRes } from '../../utils/mongodb'

export default async function handler(req: NextReq, res: NextRes) {
	// Get data from your database
	const heroesCollection = req.mdb.heroes
	const { name, password } = req.body

	if (typeof name !== 'string' || name.length === 0) {
		return res.status(401).redirect('/')
	}
	if (typeof password !== 'string' || password.length === 0) {
		return res.status(401).redirect('/')
	}

	try {
		await heroesCollection.insertOne({ _id: name, password })
	} catch {} // already exists, so we just login

	// This is not secure, I can change the cookie to log in as anyone
	res.setHeader('Set-Cookie', `heroName=${name}; Path=/`)

	res.status(200).redirect('/')
}
