import React from 'react'
import styles from '../../styles/layout.module.scss'
import useSwr from 'swr'
import { MissionData } from '../../pages/api/missions'
import NewMission from './NewMission'
import Mission from './Mission'
import { Hero } from '../../pages/api/heroes'

const fetcher = async (url) => await (await fetch(url)).json()

const Missions: React.FC<{ hero: Hero }> = ({ hero }) => {
	const { data: missionsData = [], error: missionsError } = useSwr<MissionData[]>('/api/missions', fetcher)

	if (missionsError) return <div>Failed to load your Missions `${missionsError}`</div>
	if (missionsData.length === 0) return <div>Loading...</div>

	return (
		<div>
			<h2 className={styles.title}>Missions</h2>
			<NewMission />
			<ul>
				{missionsData.map((mission) => (
					<Mission key={mission._id} hero={hero} mission={mission} />
				))}
			</ul>
		</div>
	)
}

export default Missions
