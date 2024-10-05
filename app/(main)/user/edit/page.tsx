"use client"

import { Icons } from "@/components/ui/icons"
import AuthEditForm from "@/components/auth/auth-edit-form"

const AuthProfileEditPage = () => {
	// 상태관리 중인 유저 정보를 가져온다.
	const userID = 1;

  const handleSubmit = async (data: Record<string, string>) => {
    console.log("Edit data:", data)
  }

	return (
	    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Edit Profile</h1>
        </div>
				<AuthEditForm userID={userID} onSubmit={handleSubmit} />
      </div>
    </div>
	)
}

export default AuthProfileEditPage;
