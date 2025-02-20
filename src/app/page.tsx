import OrangeRedIsometricMaze from "@/components/ui/maze/OrangeRedIsometricMaze"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black relative">
      <OrangeRedIsometricMaze />

      {/* Transparent Navbar */}
      <nav className="absolute top-0 left-0 right-0 bg-black bg-opacity-30 text-white p-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/chat" className="hover:text-orange-500 transition-colors">
              Chat
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Centered Chimera Logo and Try Now Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/images/chimera-removebg-preview.png"
          alt="Chimera Logo"
          width={400}
          height={400}
          className="opacity-80"
        />
        <Link href="/upload">
          <Button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white">Try Now</Button>
        </Link>
      </div>
    </main>
  )
}

