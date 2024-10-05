import React from "react"

import { Icons } from "@/components/ui/icons"

const AuthProfilePage = () => {
	return (
		<React.Fragment>
			<div className="flex flex-col space-y-2 text-center">
				<Icons.logo className="mx-auto h-6 w-6" />
				<h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
			</div>
			{/* <AuthForm type="login" onSubmit={handleSubmit} /> */}
		</React.Fragment>
	)
}

export default AuthProfilePage
