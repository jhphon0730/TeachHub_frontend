"use client"

import Link from 'next/link'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ChevronDown, User, LogOut } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

import { logout } from '@/store/authSlice';

interface NavbarProps {
  username: string | null
}

const Navbar = ({ username }: NavbarProps) => {
	const router = useRouter()
	const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

	const logoutUserHandler = async (): Promise<void> => {
		dispatch(logout())
		await Swal.fire({
			title: 'Logged Out',
			icon: 'success',
			showConfirmButton: false,
			timer: 1500,
		})
		router.push('/login')
		return
	}

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            My App
          </Link>

          {username ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
                Dashboard
              </Link>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 font-bold">
                    <span>{username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={logoutUserHandler} className="w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Skeleton className="h-6 w-6" />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
