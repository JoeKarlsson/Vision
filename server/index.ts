//@ts-check
import { createServer } from 'http'
import { server as WebSocketServer } from 'websocket'
import { connectToMongoDB } from '../utils/mongodb'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
	.prepare()
	.then(() => connectToMongoDB())
	.then((client) => {
		const httpServer = createServer(async (req, res) => {
			handle(req, res)
		})

		const wsServer = new WebSocketServer({ httpServer, autoAcceptConnections: true })

		client.db('vision')

		wsServer.on('connect', (connection) => {
			// var connection = request.accept('echo-protocol', request.origin)
			console.log(new Date(), 'Connection accepted.')
			connection.sendUTF(JSON.stringify({ hi: true }))

			connection.on('close', (reasonCode, description) => {
				console.log(new Date(), 'Peer ' + connection.remoteAddress + ' disconnected.')
			})
		})

		httpServer.listen(3000, () => {
			console.log('> Ready on http://localhost:3000')
		})
	})
