/* eslint-disable @typescript-eslint/no-var-requires */

const faker = require('faker')
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017')

async function main(args) {
	await client.connect()
	const heroes = client.db('vision').collection('heroes')
	const missions = client.db('vision').collection('missions')

	const currentHeroCount = await heroes.countDocuments()
	const currentMissionCount = await missions.countDocuments()

	const heroesToInsert = []
	for (let i = 0; i < 20 - currentHeroCount; i++) {
		heroesToInsert.push({ _id: faker.name.firstName(), password: faker.hacker.noun() })
	}
	if (heroesToInsert.length > 0) await heroes.insertMany(heroesToInsert)

	const heroNames = (await heroes.find({}).toArray()).map(({ _id }) => _id)

	const missionsToInsert = []
	for (let i = 0; i < 5 - currentMissionCount; i++) {
		missionsToInsert.push({
			description: faker.lorem.words(5),
			isComplete: false,
			owners: [
				...new Set([
					heroNames[Math.floor(Math.random() * heroNames.length)],
					heroNames[Math.floor(Math.random() * heroNames.length)],
					heroNames[Math.floor(Math.random() * heroNames.length)],
				]),
			],
		})
	}
	if (missionsToInsert.length > 0) await missions.insertMany(missionsToInsert)

	console.log(await missions.find({}).toArray())
	console.log(await heroes.find({}).toArray())

	return 'success.'
}

main(process.argv)
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close())
