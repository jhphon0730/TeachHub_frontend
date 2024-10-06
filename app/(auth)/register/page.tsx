"use client"

import React from 'react';
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

	React.useEffect(() => {
		if (registrationSuccess) {
			router.push('/login');
			dispatch(resetRegistrationSuccess());
		}
	}, [router, registrationSuccess, dispatch]);

  const handleSubmit = async (data: Record<string, string>) => {
		const { username, email, password, confirmPassword } = data
		console.log(data)

		if (password !== confirmPassword) {
			// SweetAlert2
			return
		}

		const { isValid, errors } = validateRegisterForm(username, password, email)
		if (!isValid) {
			console.log(errors)
			// SweetAlert2
			// set errors ( useState ) TODO
			return
		}

		try {
			// unwrap() is a utility function that extracts the payload from a fulfilled action
			const res = await dispatch(register({ username, email, password })).unwrap() 
			console.log(res)
		} catch (error) {
			console.error(error)
		}

		console.log( username, email, password, confirmPassword )
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
		</React.Fragment>
  )
}

export default RegisterPage
