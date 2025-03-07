import Navigation from "@/components/Navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
export default function Travel() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="relative w-full max-w-md mx-auto px-2 md:px-4">
        <div className="h-[6vh] md:h-[3.5vh] flex items-center justify-center">
          <Image
            src="/TRAVEL.png"
            alt="Travel"
            width={2031}
            height={224}
            className="w-auto h-full"
            priority
          />
        </div>
      </div>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">THE CHESHIRE INN</p>
        <p>6300 Clayton Rd, Richmond Heights, MO 63117</p>
        <a
          className="text-wedding-purple"
          href="https://www.cheshirestl.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.cheshirestl.com/
        </a>
        <br />
        <br />
        <p className="max-w-4xl mx-auto px-4">
          The Cheshire Inn is a family favorite boutique hotel in the Dogtown
          neighborhood just a few minutes from St. James. We have a wedding
          block there for $185 a night, follow this link or call (314) 932-7858
          and reference the &ldquo;Hardy/Hilbert Wedding Room Block.&rdquo;
        </p>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="max-w-4xl mx-auto px-4">
          If you&apos;re wanting to stay within walking distance of the
          reception at The City Museum, there are multiple hotel options located
          in downtown St. Louis. Here are two close to the City Museum:
        </p>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">THE LAST HOTEL</p>
        <p>1501 Washington Ave, St. Louis, MO 63103</p>
        <a
          className="text-wedding-purple"
          href="https://thelasthotelstl.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://thelasthotelstl.com/
        </a>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">
          21C MUSEUM HOTEL ST LOUIS
        </p>
        <p>1528 Locust St, St. Louis, MO 63103</p>
        <a
          className="text-wedding-purple"
          href="https://www.21cmuseumhotels.com/stlouis/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.21cmuseumhotels.com/stlouis/
        </a>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="max-w-4xl mx-auto px-4">
          There are always a multitude of air bnbs and hotels available. If
          you&apos;re unsure of an area while looking for accomodations, or want
          specific neighborhood recommendations, contact Margaret at (314)
          680-4553.
        </p>
      </section>

      <br />

      <div className="relative w-full max-w-md mx-auto px-2 md:px-4">
        <div className="h-[6vh] md:h-[3.5vh] flex items-center justify-center">
          <Image
            src="/THINGSTODO.png"
            alt="Things to Do"
            width={1049}
            height={218}
            className="w-auto h-full"
            priority
          />
        </div>
      </div>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">CITY MUSEUM</p>
        <p className="max-w-4xl mx-auto px-4">
          Even though the wedding reception at the City Museum does not start
          until 5pm, guests have all day access. This is one of our favorite
          places and we&apos;re so excited to celebrate there with you all. A
          change of clothes is recommended if you&apos;re planning on playing
          and exploring! If you&apos;ve never been, it is a large playground/art
          sculpture built in an old shoe factory. A wonderful documentary came
          out last year about the museum&apos;s creator, Bob Cassily. You can
          view the trailer here:
        </p>
        <a
          className="text-wedding-purple"
          href="https://youtu.be/KjKKPyPhRl4?si=Wc2TJZ_QQjz78Fmk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube link
        </a>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">FOREST PARK</p>
        <p className="max-w-4xl mx-auto px-4">
          Another St. Louis gem is Forest Park, which is located a few minutes
          away from St. James. One of the largest urban parks in the country,
          Forest Park is home to the St. Louis Art Museum, the Zoo, the Science
          Center, and the Missouri History Museum, which are all free! It also
          has many walking paths and trails.
        </p>
        <a
          className="text-wedding-purple"
          href="https://www.forestparkforever.org/visit"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.forestparkforever.org/visit
        </a>
      </section>

      <section className="text-center pt-6 sm:pt-5 md:pt-4">
        <p className="font-semibold text-wedding-red">
          MISSOURI BOTANICAL GARDEN
        </p>
        <p className="max-w-4xl mx-auto px-4">
          If you&apos;re in the mood for plants, another favorite spot of ours
          is the Missouri Botanical Garden. It is located in the historic Shaw
          neighborhood and is close to Tower Grove Park, another great walking
          park.
        </p>
        <a
          className="text-wedding-purple"
          href="https://www.missouribotanicalgarden.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.missouribotanicalgarden.org/
        </a>
      </section>
      <Footer />
    </div>
  );
}
