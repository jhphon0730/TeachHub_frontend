"use client"

import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MailIcon, PenIcon, MapPinIcon, LinkIcon, Github, Twitter } from 'lucide-react'

import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const AuthProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
		<div className="flex flex-col md:flex-row gap-8 px-4 md:px-0">
			<div className="md:w-1/3">
				<div className="sticky top-8">
					<Avatar className="w-48 h-48 mx-auto">
						<AvatarImage src={""} alt={user.username} />
						<AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
					<h1 className="text-3xl font-bold mt-4 text-center">{user.username}</h1>
					<p className="text-gray-500 text-center mt-2">Software Developer</p>
					<div className="mt-6 space-y-4">
						<div className="flex items-center">
							<MailIcon className="w-5 h-5 mr-2 text-gray-500" />
							<span>{user.email}</span>
						</div>
						<div className="flex items-center">
							<MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
							<span>Seoul, South Korea</span>
						</div>
						<div className="flex items-center">
							<LinkIcon className="w-5 h-5 mr-2 text-gray-500" />
							<a href="#" className="text-blue-500 hover:underline">https://mywebsite.com</a>
						</div>
						<div className="flex items-center">
							<CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
							<span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
							<span className="ml-2 text-gray-500 text-sm">Last updated {new Date(user.updated_at).toLocaleDateString()}</span>
						</div>
					</div>
					<div className="mt-6 flex justify-center space-x-4">
						<a href="#" className="text-gray-500 hover:text-gray-700">
							<Github className="w-6 h-6" />
						</a>
						<a href="#" className="text-gray-500 hover:text-gray-700">
							<Twitter className="w-6 h-6" />
						</a>
					</div>
					<div className="mt-6">
						<Link href="/edit" passHref>
							<Button className="w-full">
								<PenIcon className="w-4 h-4 mr-2" />
								Edit Profile
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div className="md:w-2/3">
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">About Me</h2>
					<p className="text-gray-700">
						{user.bio || "..."}
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Skills</h2>
					<div className="flex flex-wrap gap-2">
						{user.skills && user.skills.length && user.skills.map((skill) => (
							<span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
								{skill}
							</span>
						))}
					</div>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
					<div className="space-y-4">
						{[1, 2, 3].map((_, index) => (
							<div key={index} className="bg-gray-100 p-4 rounded-lg">
								<h3 className="font-semibold">Activity Title</h3>
								<p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
  )
}

export default AuthProfilePage
