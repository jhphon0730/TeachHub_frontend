"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

interface AuthEditFormProps {
	userID: number
  onSubmit: (data: Record<string, string>) => Promise<void>
}

const AuthEditForm = ({ userID, onSubmit }: AuthEditFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Record<string, string>>({})

	useEffect(() => {
		// fetch user data 
	}, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    await onSubmit(formData)
    setIsLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="username">
							Username
						</Label>
						<Input
							id="username"
							placeholder="Username"
							type="text"
							autoCapitalize="words"
							autoComplete="username"
							autoCorrect="off"
							disabled={isLoading}
							onChange={handleInputChange}
						/>
					</div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
            />
          </div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="confirm-password">
							Confirm Password
						</Label>
						<Input
							id="confirm-password"
							placeholder="Confirm Password"
							type="password"
							autoCapitalize="none"
							autoCorrect="off"
							disabled={isLoading}
							onChange={handleInputChange}
						/>
					</div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
						Update Profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AuthEditForm