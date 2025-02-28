import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function RSVP() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="relative w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <Image
          src="/COMINGSOON.png"
          alt="Coming Soon"
          width={1682}
          height={224}
          priority
        />
      </div>
    </div>
  );
}
