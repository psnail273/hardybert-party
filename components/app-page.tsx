'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from 'lucide-react'
import { WEDDING_DATE, WEDDING_LOCATION } from '@/lib/constants'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">Nicholas & Margaret</h1>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="mr-2 text-primary" />
              <p className="text-xl">{WEDDING_DATE}</p>
            </div>
            <div className="flex items-center justify-center mb-8">
              <MapPin className="mr-2 text-primary" />
              <p className="text-xl">{WEDDING_LOCATION}</p>
            </div>
            <Button size="lg" className="text-lg px-8 py-6">
              RSVP Now
            </Button>
          </div>
        </section>

        <nav className="py-4 border-y border-primary">
          <ul className="flex justify-center space-x-6 max-w-5xl mx-auto px-4">
            <li><Link href="/" className="text-primary hover:underline">Home</Link></li>
            <li><Link href="/our-story" className="text-primary hover:underline">Our Story</Link></li>
            <li><Link href="/travel" className="text-primary hover:underline">Travel</Link></li>
            <li><Link href="/wedding-party" className="text-primary hover:underline">Wedding Party</Link></li>
          </ul>
        </nav>

        <section className="container mx-auto px-4 py-12">
          <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto">
            <Image
              src="/HardyBertTree.jpg"
              alt="Nicholas and Margaret"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="rounded-lg object-cover"
            />
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-6 text-center">
        <p>&copy; 2024 Nicholas & Margaret. All rights reserved.</p>
      </footer>
    </div>
  )
}