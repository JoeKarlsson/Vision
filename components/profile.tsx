import React from 'react'
import styles from '../styles/profile.module.scss'
import { Hero } from '../pages/api/heroes'

export const Profile: React.FC<{ hero: Hero }> = ({ hero }) => (
	<div className={styles.profile}>
		<img src="http://placeimg.com/100/100/animals" height="100" width="100"></img>
		<div>
			<label className={styles.label}>Name:</label>
			<p className={styles.data}>{hero._id}</p>
		</div>
		<div>
			<label className={styles.label}>Password:</label>
			<p className={styles.data}>{hero.password}</p>
		</div>
	</div>
)
