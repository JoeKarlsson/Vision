import { createServer } from 'http'
import { server as WebSocketServer } from 'websocket'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
import { connectToMongoDB } from '../utils/mongodb'

app
	.prepare()
	.then(() => connectToMongoDB())
	.then((client) => {
		const httpServer = createServer(async (req, res) => {
			handle(req, res)
		})

		const wsServer = new WebSocketServer({ httpServer, autoAcceptConnections: true })

		const cs = client.db('vision').collection('missions').watch()

		cs.on('change', (change) => {
			wsServer.broadcastUTF(JSON.stringify(change))
		})

		wsServer.on('connect', (connection) => {
			// var connection = request.accept('echo-protocol', request.origin)
			console.log(new Date(), 'Connection accepted.')
			connection.on('close', (reasonCode, description) => {
				console.log(new Date(), `Peer ${connection.remoteAddress} disconnected [${reasonCode}] - ${description}`)
			})
		})

		httpServer.listen(3000, () => {
			console.log('> Ready on http://localhost:3000')
		})
	})
