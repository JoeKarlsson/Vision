import React, { useState } from 'react'
import { MissionData } from '../../pages/api/missions'

const Mission: React.FC<{ mission: MissionData }> = ({ mission: { _id, description, isComplete } }) => {
	const [complete, setComplete] = useState(isComplete)

	const postChange = async (value) => {
		await (
			await fetch(`/api/mission/${_id}`, {
				method: 'POST',
				body: JSON.stringify({ isComplete: value }),
			})
		).json()
		setComplete(value)
	}

	return (
		<li>
			<input type="checkbox" checked={complete} onChange={(ev) => postChange(ev.target.checked)}></input>
			<span>{description}</span>
		</li>
	)
}

export default Mission
