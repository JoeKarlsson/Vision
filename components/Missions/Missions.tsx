import React from 'react'
import styles from '../../styles/layout.module.scss'
import useSwr from 'swr'
import { MissionData } from '../../pages/api/missions'
import NewMission from './NewMission'

const fetcher = async (url) => await (await fetch(url)).json()

const Missions = () => {
	const { data: missionsData, error: missionsError } = useSwr<MissionData[]>('/api/missions', fetcher)

	if (missionsError) return <div>Failed to load your Missions `${missionsError}`</div>
	if (!missionsData) return <div>Loading...</div>

	return (
		<div>
			<h2 className={styles.title}>Missions</h2>
			<NewMission />
			<ul>
				{(missionsData ?? []).map((mission) => (
					<li key={mission._id}>{`Mission ${mission._id}: ${mission.description}`}</li>
				))}
			</ul>
		</div>
	)
}

export default Missions
