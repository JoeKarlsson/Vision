import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

let client: W3CWebSocket

/** Memoized client */
function connectToWS(onMessage: (data: Record<string, unknown>) => void) {
	if (client) return client

	client = new W3CWebSocket('ws://localhost:3000/')

	client.onerror = () => {
		console.log('Connection Error')
	}

	client.onopen = () => {
		console.log('WebSocket Client Connected')
	}

	client.onclose = () => {
		console.log('echo-protocol Client Closed')
	}

	client.onmessage = (e) => {
		const data = Object.assign(Object.create(null), JSON.parse(e.data as string))
		onMessage(data)
	}

	return client
}

const Changes: React.FC = () => {
	const [changes, setChanges] = useState([])
	useEffect(() => {
		connectToWS((data) => {
			console.log('Received: ', data)
			setChanges([...changes, data])
		})
	})

	return (
		<>
			<h3>Live Mission feed</h3>
			<ul>
				{changes.map((c, i) => (
					<li key={i}>
						<span>ns:</span>
						<code>
							{c.ns.db}.{c.ns.coll}
						</code>
						<span>op:</span>
						<code>{c.operationType}</code>
						<span>doc:</span>
						<code>{JSON.stringify(c.fullDocument)}</code>
					</li>
				))}
			</ul>
		</>
	)
}

export default Changes
