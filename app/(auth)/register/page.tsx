"use client"

import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from "@/components/ui/icons";
import { AuthForm } from "@/components/auth/auth-form";

import { AppDispatch, RootState } from '@/store';
import { validateRegisterForm } from "@/lib/utils"
import { register, resetRegistrationSuccess } from '@/store/authSlice';

const RegisterPage = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, registrationSuccess } = useSelector((state: RootState) => state.auth);

	const [errors, setErrors] = React.useState<string[]>();

	React.useEffect(() => {
		if (registrationSuccess) {
			router.push('/login');
			dispatch(resetRegistrationSuccess());
		}
	}, [router, registrationSuccess, dispatch]);

  const handleSubmit = async (data: Record<string, string>) => {
		const { username, email, password, confirmPassword } = data

		if (!username || !email || !password || !confirmPassword) {
			setErrors(["Please fill in all fields"])
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		if (password !== confirmPassword) {
			setErrors(["Passwords do not match"])
			await Swal.fire({
				icon: 'error',
				title: 'Passwords do not match',
				text: 'Please ensure that both passwords match',
			})
			return
		}

		const { isValid, errors } = validateRegisterForm(username, password, email)
		if (!isValid) {
			setErrors(errors)
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		// unwrap() is a utility function that extracts the payload from a fulfilled action
		await dispatch(register({ username, email, password })).unwrap() 
		.then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Account created successfully',
				text: 'You can now login to your account',
			})
		})
		.catch((err) => {
			Swal.fire({
				icon: 'error',
				title: 'An error occurred',
				text: err.message,
			})
		})
		return
  }

  return (
		<React.Fragment>
			<div className="flex flex-col space-y-2 text-center">
				<Icons.logo className="mx-auto h-6 w-6" />
				<h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p className="text-sm text-muted-foreground">
					Enter your details below to create your account
				</p>
			</div>
			<AuthForm 
				type="register" 
				loading={loading}
				onSubmit={handleSubmit} 
			/>
			{ error && <p className="text-red-500 text-sm text-center">{error}</p> }
			{ errors && errors.map((error, index) => (
				<p key={index} className="text-red-500 text-sm text-center">{error}</p>
			)) }
		</React.Fragment>
  )
}

export default RegisterPage
