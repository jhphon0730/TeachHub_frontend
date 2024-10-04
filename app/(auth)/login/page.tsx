"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Icons } from "@/components/ui/icons"

const AuthLoginPage = () => {
  const handleSubmit = async (data: Record<string, string>) => {
    // 로그인 로직 구현
    console.log("Login data:", data)
    // TODO: API 호출 또는 인증 로직 추가
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <AuthForm type="login" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default AuthLoginPage
