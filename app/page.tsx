import Image from 'next/image'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />

      {/* Full-width image */}
      <div className="relative w-4/5 mx-auto">
        <Image
          src="/HardyBertTree.jpg"
          alt="Nicholas and Margaret"
          width={6000}
          height={4000}
          priority
        />
      </div>

      {/* Wedding details */}
      <div className="text-center py-12 bg-white">
        <h2 className="text-3xl font-serif mb-2">September 6th, 2025</h2>
        <p className="text-xl">St. Louis, MO</p>
      </div>
    </div>
  )
}

