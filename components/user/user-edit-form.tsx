"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

import { UserModel } from "@/lib/api/auth"
import { AuthUpdateFormError } from "@/lib/utils"

interface UserEditFormProps {
	user: UserModel
	errors: AuthUpdateFormError
  onSubmit: (data: Record<string, string>) => Promise<void>
}

const UserEditForm = ({ user, errors, onSubmit }: UserEditFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Record<string, string>>({
		"username": user.username,
		"email": user.email,
		"bio": user.bio,  
		"password": "",
		"confirmPassword": "",
	})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    await onSubmit(formData)
    setIsLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    })
  }

  return (
    <div className="grid gap-6 mt-8">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="mt-2 font-bold" htmlFor="username">
							Username
						</Label>
						<Input
							id="username"
							placeholder="Username"
							type="text"
							autoCapitalize="words"
							autoComplete="username"
							autoCorrect="off"
							onChange={handleInputChange}
							value={formData.username}
							disabled={true}
						/>
						{ errors.errors.username && <p className="text-red-500 text-sm">{errors.errors.username}</p> }
					</div>
          <div className="grid gap-1">
            <Label className="mt-2 font-bold" htmlFor="email">
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
							value={formData.email}
            />
						{ errors.errors.email && <p className="text-red-500 text-sm">{errors.errors.email}</p> }
          </div>
          <div className="grid gap-1">
            <Label className="mt-2 font-bold" htmlFor="bio">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Bio"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputChange}
							value={formData.bio}
            />
          </div>
          <div className="grid gap-1">
            <Label className="mt-2 font-bold" htmlFor="password">
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
						{ errors.errors.password && <p className="text-red-500 text-sm">{errors.errors.password}</p> }
          </div>
					<div className="grid gap-1">
						<Label className="mt-2 font-bold" htmlFor="confirmPassword">
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							placeholder="Confirm Password"
							type="password"
							autoCapitalize="none"
							autoCorrect="off"
							disabled={isLoading}
							onChange={handleInputChange}
						/>
					</div>
					{ errors.errors.password && <p className="text-red-500 text-sm">{errors.errors.password}</p> }
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

export default UserEditForm
