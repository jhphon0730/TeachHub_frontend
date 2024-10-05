"use client"

import React from 'react';

import { AuthForm } from "@/components/auth/auth-form"
import { Icons } from "@/components/ui/icons"

const RegisterPage = () => {
  const handleSubmit = async (data: Record<string, string>) => {
    // 회원가입 로직 구현
    console.log("Register data:", data)
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
			<AuthForm type="register" onSubmit={handleSubmit} />
		</React.Fragment>
  )
}

export default RegisterPage
