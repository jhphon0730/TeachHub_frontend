import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            My App
          </Link>
          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-gray-800 hover:text-gray-600">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-800 hover:text-gray-600">
              Profile
            </Link>
            {/* Add more navigation items as needed */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
