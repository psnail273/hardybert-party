import Navigation from '@/components/Navigation'

export default function Details() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-serif mb-8 text-center">Wedding Details</h1>
        
        <div className="space-y-8 text-center">
          <section>
            <h2 className="text-2xl font-serif mb-4">Ceremony</h2>
            <p className="font-semibold">St. James the Greater Catholic Church</p>
            <p>1:00 PM - 1:30 PM</p>
            <p>6401 Wade Ave</p>
            <p>St. Louis, MO 63139</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif mb-4">Reception</h2>
            <p className="font-semibold">City Museum - Architecture Hall</p>
            <p>5:00 PM - 10:00 PM</p>
            <p>750 N 16th St</p>
            <p>St. Louis, MO 63103</p>
          </section>
        </div>
      </div>
    </div>
  )
} 