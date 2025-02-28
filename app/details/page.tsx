import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function Details() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="relative w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <Image
          src="/WEDDINGCEREMONY.png"
          alt="Wedding Ceremony"
          width={2031}
          height={224}
          priority
        />
      </div>

      <section className="text-center py-2 sm:py-4 md:py-6 lg:py-8">
        <p>Saturday, September 6th, 2025</p>
        <p>1:00 PM - 1:30 PM</p>
        <br></br>
        <p className="font-semibold">ST. JAMES THE GREATER CATHOLIC CHURCH</p>
        <p>6401 Wade Ave, St. Louis, MO 63139</p>
      </section>

      <div className="relative w-1/3 lg:w-1/4 xl:w-1/5 mx-auto">
        <Image
          src="/RECEPTION.png"
          alt="Reception"
          width={1049}
          height={218}
          priority
        />
      </div>

      <section className="text-center py-2 sm:py-4 md:py-6 lg:py-8">
        <p>Saturday, September 6th, 2025</p>
        <p>5:00 PM - 10:00 PM</p>
        <br></br>
        <p className="font-semibold">CITY MUSEUM - ARCHITECTURE HALL</p>
        <p>750 N 16th St, St. Louis, MO 63103</p>
      </section>
    </div>
  );
}
