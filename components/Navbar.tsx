import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'

interface NavbarProps {
	username: string | null
}

const Navbar = ({ username }: NavbarProps) => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            My App
          </Link>

					{ username ? 
						(
							<div className="flex space-x-4">
								<Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
									Dashboard
								</Link>
								<Link href="/profile" className="text-gray-800 hover:text-gray-600 underline">
									{ username }
								</Link>
							</div>
						) :
						(
							<Skeleton className="h-6 w-6" />
						)
					}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
