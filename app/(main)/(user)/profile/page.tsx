import { Icons } from "@/components/ui/icons"

const AuthProfilePage = () => {
	return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
        </div>
				{/* <AuthForm type="login" onSubmit={handleSubmit} /> */}
      </div>
    </div>
	)
}

export default AuthProfilePage
