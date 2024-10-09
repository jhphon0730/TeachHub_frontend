"use client"

import React from "react"
import Swal from 'sweetalert2';

import AuthEditForm from "@/components/auth/auth-edit-form"

import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { update } from '@/store/authSlice'
import { AuthUpdateFormError, validateUpdateForm } from "@/lib/utils"

const AuthProfileEditPage = () => {
	const { loading, error, user } = useSelector((state: RootState) => state.auth);
	const [errors, setErrors] = React.useState<AuthUpdateFormError>({ isValid: true, errors: {} });

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (data: Record<string, string>) => {
		const {username, email, bio, skills, password, confirmPassword} = data 

		if (!username || !password || !confirmPassword || !email) {
			setErrors( { isValid: false, errors: { username: 'required', email: 'required', password: 'required' } })
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: `Please ensure that all fields are filled correctly \n\n username, email, password, confirmPassword`,
			})
			return
		}

		if ( password !== confirmPassword ) {
			setErrors( { isValid: false, errors: { password: 'Passwords do not match' } })
			await Swal.fire({
				icon: 'error',
				title: 'Passwords do not match',
				text: 'Please ensure that both passwords match',
			})
			return
		}

		const isError = validateUpdateForm(username, email, password)
		if (!isError.isValid) {
			setErrors(isError)
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

  }

	return (
		<div className="sm:w-[350px] mx-auto">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Update Your Profile</h1>
			</div>
			<AuthEditForm 
				user={user}
				errors={errors}
				onSubmit={handleSubmit} />
		</div>
	)
}

export default AuthProfileEditPage;
