import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { Hero } from '../../pages/api/heroes'
import { MissionData } from '../../pages/api/missions'

const Mission: React.FC<{ mission: MissionData; hero: Hero }> = ({
	mission: { _id, description, isComplete, completedBy },
	hero,
}) => {
	const [complete, setComplete] = useState(isComplete)
	const { addToast } = useToasts()

	const postChange = async (value) => {
		const result = await fetch(`/api/mission/${_id}`, {
			method: 'POST',
			body: JSON.stringify({ isComplete: value, completedBy: hero._id }),
		})
		if (result.ok) {
			setComplete(value)
		} else {
			const { message } = await result.json()
			addToast(message, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}

	return (
		<li>
			<input type="checkbox" checked={complete} onChange={(ev) => postChange(ev.target.checked)}></input>
			<span>{description}</span>
			{completedBy ? <span> completed by {completedBy}</span> : <></>}
		</li>
	)
}

export default Mission
