"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div>
      {/* Header with couple's names */}
      <header className="text-center py-8 bg-white border-b">
        <h1 className="text-4xl font-serif font-bold">Nicholas & Margaret</h1>
      </header>

      {/* Navigation bar */}
      <nav className="bg-white p-4 border-b">
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className={`hover:underline ${pathname === '/' ? 'font-semibold' : ''}`}>Home</Link></li>
          <li><Link href="/details" className={`hover:underline ${pathname === '/details' ? 'font-semibold' : ''}`}>Details</Link></li>
          <li><Link href="/travel" className={`hover:underline ${pathname === '/travel' ? 'font-semibold' : ''}`}>Travel</Link></li>
          <li><Link href="/rsvp" className={`hover:underline ${pathname === '/rsvp' ? 'font-semibold' : ''}`}>RSVP</Link></li>
          <li><Link href="/registry" className={`hover:underline ${pathname === '/registry' ? 'font-semibold' : ''}`}>Registry</Link></li>
        </ul>
      </nav>
    </div>
  )
} 