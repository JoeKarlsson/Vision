import { useToasts } from 'react-toast-notifications'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

let client: W3CWebSocket

/** Memoized client */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function connectToWS(onMessage: (data: Record<string, any>) => void) {
	if (client) return client

	client = new W3CWebSocket('ws://localhost:3000/')

	client.onerror = () => {
		console.log('Connection Error')
	}

	client.onopen = () => {
		console.log('WebSocket Client Connected')
	}

	client.onclose = () => {
		console.log('Client Closed')
	}

	client.onmessage = (e) => {
		let data = JSON.parse(e.data as string)
		if (data) data = Object.assign(Object.create(null), data)
		// console.log('Received: ', data)
		onMessage(data)
	}

	return client
}

const Changes: React.FC = () => {
	const { addToast } = useToasts()
	connectToWS((data) => {
		if (data.operationType === 'insert') {
			addToast(`${data.fullDocument.owner} added a new mission: ${data.fullDocument.description}`, {
				appearance: 'warning',
				autoDismiss: true,
			})
		}
		if (data.operationType === 'update') {
			if (typeof data.updateDescription?.updatedFields?.isComplete === 'boolean') {
				const completed = data.updateDescription?.updatedFields?.isComplete
				addToast(
					`${data.fullDocument.completedBy} just  ${completed ? 'finished' : 'unfinished'} a mission ${
						data.fullDocument.description
					}`,
					{
						appearance: 'info',
						autoDismiss: true,
					}
				)
			}
		}
	})

	return <></>
}

export default Changes
