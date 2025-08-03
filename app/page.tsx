import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";
import Link from "next/link";

export default function Details() {
  const heartImages = [
    "/HEART1.png",
    "/HEART2.png",
    "/HEART3.png",
    "/HEART4.png",
    "/HEART5.png",
    "/HEART6.png",
    "/HEART7.png",
    // Add more heart images as needed
  ];

  return (
    <div className="flex flex-col justify-center gap-8 md:gap-16">
      <div className="flex flex-col w-full gap-2 justify-center items-center">
        <Link href="/rsvp" className="hover:opacity-70 transition-opacity">
          <Image
            src="/RSVP_RED_ARROWS.png"
            alt="Wedding Ceremony"
            width={883}
            height={283}
            className="h-image-md lg:h-image-lg"
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center text-center">
        <Image
          src="/BIGNAMES_GRAPHIC.png"
          alt="Big Names Info"
          width={6867}
          height={6972}
          className="px-2 md:px-0 h-[120px] md:h-[150px] lg:h-[180px]"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center text-center">
        <Image
          src="/WEDDINGCEREMONY.png"
          alt="Wedding Ceremony"
          width={2031}
          height={224}
          className="px-2 md:px-0 h-image-sm md:h-image-md lg:h-image-lg"
          style={{ objectFit: "contain" }}
          priority
        />
        <section>
          <p>Saturday, September 6th, 2025</p>
          <p className="font-semibold">1:00 PM - 1:30 PM</p>
          <p className="font-semibold">ST. JAMES THE GREATER CATHOLIC CHURCH</p>
          <p>6401 Wade Ave, St. Louis, MO 63139</p>
          <br />
          <p className="max-w-4xl mx-auto px-4">
            For the wedding ceremony at St. James, there are two parking lots
            available along with street parking. The larger lot is accessible
            via Tamm Ave right across the street from St. James. The parking lot
            behind St. James is accessed via Wade Ave and is reserved for guests
            who require the accessible entrance without stairs.
          </p>
        </section>
      </div>

      <div className="flex flex-col w-full gap-4 justify-center items-center text-center">
        <Image
          src="/RECEPTION.png"
          alt="Reception"
          width={1049}
          height={218}
          className="h-image-sm md:h-image-md lg:h-image-lg"
          style={{ objectFit: "contain" }}
          priority
        />
        <section>
          <p>Saturday, September 6th, 2025</p>
          <p className="font-semibold">5:00 PM - 10:00 PM</p>
          <p className="font-semibold">CITY MUSEUM - ARCHITECTURE HALL</p>
          <p>750 N 16th St, St. Louis, MO 63103</p>
          <br />
          <p className="mx-auto max-w-[48rem]">
            Even though Architecture Hall will not be open until 5pm, your
            invitation includes all-day access to the City Museum should you
            wish to explore the many levels and exhibits between the ceremony
            and the reception!
          </p>
          <br />
          <p className="max-w-4xl mx-auto px-4">
            For the reception, the City Museum has a paid secure lot enclosed by
            serpents at 16th & Delmar. There are several other paid lots and
            street parking nearby. Uber and Lyft ridesharing is also easily
            available in St. Louis and encouraged.
          </p>
        </section>
      </div>

      <div className="flex flex-col w-full justify-center items-center text-center">
        <p className="font-semibold text-wedding-red">WHAT TO WEAR</p>
        <p className="mx-auto max-w-[48rem]">
          Dress nicely, as you would for a daytime celebration or church. Suits
          and ties are welcome, but not required. Early September in St. Louis
          is generally pretty warm, so comfort is encouraged.
        </p>
      </div>

      {/* Carousel of Heart Images */}
      <div className="relative w-full max-w-[48rem] mx-auto px-4">
        <ImageCarousel
          images={heartImages}
          interval={6000}
          width={2393}
          height={2308}
        />
      </div>
    </div>
  );
}
