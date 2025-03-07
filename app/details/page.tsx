import Image from "next/image";

export default function Details() {
  return (
    <div className="">
      <div className="relative w-full max-w-lg mx-auto px-2 md:px-4">
        <div className="h-[6vh] flex items-center justify-center">
          <Image
            src="/WEDDINGCEREMONY.png"
            alt="Wedding Ceremony"
            width={2031}
            height={224}
            className="w-auto h-full"
            priority
          />
        </div>
      </div>

      <section className="text-center py-2 sm:py-4 md:py-6 lg:py-8">
        <p>Saturday, September 6th, 2025</p>
        <p>1:00 PM - 1:30 PM</p>
        <br></br>
        <p className="font-semibold">ST. JAMES THE GREATER CATHOLIC CHURCH</p>
        <p>6401 Wade Ave, St. Louis, MO 63139</p>
      </section>

      <br />
      <br />

      <div className="relative w-full max-w-lg mx-auto px-2 md:px-4">
        <div className="h-[6vh] flex items-center justify-center">
          <Image
            src="/RECEPTION.png"
            alt="Reception"
            width={1049}
            height={218}
            className="w-auto h-full"
            priority
          />
        </div>
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
