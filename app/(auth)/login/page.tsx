"use client"

import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from "@/components/ui/icons";
import { AuthForm } from "@/components/auth/auth-form";

import { AppDispatch, RootState } from '@/store';
import { validateLoginForm } from "@/lib/utils"
import { login } from '@/store/authSlice';

const AuthLoginPage = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, user, token } = useSelector((state: RootState) => state.auth);

	const [errors, setErrors] = React.useState<string[]>();

	React.useEffect(() => {
		if (user && token) {
			router.push('/dashboard');
		}
	}, [router, dispatch, user, token]);

  const handleSubmit = async (data: Record<string, string>) => {
		const { username, password } = data

		if (!username || !password) {
			setErrors(["Please fill in all fields"])
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		const { isValid, errors } = validateLoginForm(username, password)
		if (!isValid) {
			setErrors(errors)
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		await dispatch(login({ username, password })).unwrap()
		.then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Login successful',
				text: 'You have successfully logged in',
			})
		})
		.catch((error) => {
			setErrors([error.message])
			Swal.fire({
				icon: 'error',
				title: 'Login failed',
				text: error.message,
			})
		})
		return
  }

  return (
		<React.Fragment>
			<div className="flex flex-col space-y-2 text-center">
				<Icons.logo className="mx-auto h-6 w-6" />
				<h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
				<p className="text-sm text-muted-foreground">
					Enter your email to sign in to your account
				</p>
			</div>
			<AuthForm type="login" loading={loading} onSubmit={handleSubmit} />
			{ error && <p className="text-red-500 text-sm text-center">{error}</p> }
			{ errors && errors.map((error, index) => (
				<p key={index} className="text-red-500 text-sm text-center">{error}</p>
			)) }
		</React.Fragment>
  )
}

export default AuthLoginPage
