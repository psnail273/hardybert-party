import Image from "next/image";

export default function Registry() {
  return (
    <div className="">
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
    </div>
  );
}
