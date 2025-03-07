import Navigation from "@/components/Navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
export default function RSVP() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="relative w-full max-w-md mx-auto px-4">
        <Image
          src="/COMINGSOON.png"
          alt="Coming Soon"
          width={1682}
          height={224}
          className="w-full h-auto"
          priority
        />
      </div>
      <Footer />
    </div>
  );
}
