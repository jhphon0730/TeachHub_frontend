"use client"

import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from "@/components/ui/icons";
import { AuthForm } from "@/components/auth/AuthForm";

import { login, logout } from '@/store/authSlice';
import { validateLoginForm } from "@/lib/utils"
import { AppDispatch, RootState } from '@/store';

const AuthLoginPage = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, user, token } = useSelector((state: RootState) => state.auth);

	React.useEffect(() => {
		dispatch(logout());
	}, []);

  const handleSubmit = async (data: Record<string, string>) => {
		const { username, password } = data

		if (!username || !password) {
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		const { isValid } = validateLoginForm(username, password)
		if (!isValid) {
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
			router.push('/dashboard')
		})
		.catch((error) => {
			Swal.fire({
				icon: 'error',
				title: 'Login failed',
				text: "Please check your credentials and try again",
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
		</React.Fragment>
  )
}

export default AuthLoginPage
