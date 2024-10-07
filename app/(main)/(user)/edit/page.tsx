"use client"

import React from "react"

import { Icons } from "@/components/ui/icons"
import AuthEditForm from "@/components/auth/auth-edit-form"

import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const AuthProfileEditPage = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (data: Record<string, string>) => {
    console.log("Edit data:", data)
  }

	return (
		<div className="sm:w-[350px] mx-auto">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Edit Profile</h1>
			</div>
			<AuthEditForm onSubmit={handleSubmit} />
		</div>
	)
}

export default AuthProfileEditPage;
