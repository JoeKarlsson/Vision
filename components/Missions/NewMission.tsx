import Button from '@leafygreen-ui/button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Hero } from '../../pages/api/heroes'

type Mission = {
	description: string
}

const NewMission: React.FC<{ hero: Hero }> = ({ hero }) => {
	const { register, handleSubmit, errors } = useForm<Mission>()

	const onSubmit = async (data: Mission) => {
		Reflect.set(data, 'owner', hero._id)
		try {
			const response = await fetch('/api/missions', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/json',
				}),
				body: JSON.stringify({
					data,
				}),
			})
			return response.ok
		} catch (ex) {
			return false
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="field">
				<label htmlFor="description">Description</label>
				<input type="text" id="description" name="description" ref={register({ required: true })} />
				{errors.description && errors.description.type === 'required' && (
					<div className="error">Your must enter your Mission.</div>
				)}
			</div>
			<Button type="submit">Save</Button>
		</form>
	)
}

export default NewMission
