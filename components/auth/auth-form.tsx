"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (data: Record<string, string>) => Promise<void>
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<Record<string, string>>({})

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
          {type === 'register' && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleInputChange}
              />
            </div>
          )}
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
          {type === 'register' && (
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
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline" disabled={isLoading}>
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline" disabled={isLoading}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      {type === 'login' ? (
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      ) : (
        <>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </>
      )}
    </div>
  )
}

