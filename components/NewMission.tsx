import React from 'react'
import { useForm } from 'react-hook-form'

type Mission = {
	description: string
}

const NewMission = () => {
	const { register, handleSubmit, errors } = useForm<Mission>()

	const onSubmit = async (data: Mission) => {
		console.log('data', data)
		try {
			const response = await fetch('/api/missions', {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
					Accept: "application/json"
				}),
				body: JSON.stringify({
					description: data,
				})
			});
			return response.ok;
		} catch (ex) {
			return false;
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="field">
				<label htmlFor="description">Description</label>
				<input type="text" id="description" name="description" ref={register({ required: true })} />
				{errors.description && errors.description.type === 'required' && <div className="error">Your must enter your Mission.</div>}
			</div>
			<button type="submit">Save</button>
		</form>
	)
}

export default NewMission
