import Image from "next/image";
import Navigation from "@/components/Navigation";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  // Array of Heart images - update with your actual image paths
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
    <div className="min-h-screen">
      <Navigation />

      {/* Names */}
      <div className="relative w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <Image
          src="/NANDMMARRIED.png"
          alt="Nicholas and Margaret"
          width={1955}
          height={1063}
          priority
        />
      </div>

      {/* Carousel of Heart Images */}
      <div className="my-8 w-1/3 mx-auto">
        <ImageCarousel
          images={heartImages}
          interval={6000}
          width={2393}
          height={2308}
        />
      </div>

      {/* Wedding details */}
      <div className="relative w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <Image
          src="/DATE.png"
          alt="The Big Day"
          width={1313}
          height={690}
          priority
        />
      </div>
    </div>
  );
}
