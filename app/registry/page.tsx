import Image from "next/image";

export default function Registry() {
  return (
    <div className="relative w-full px-2 md:px-4 flex justify-center">
      <Image
        src="/COMINGSOON.png"
        alt="Coming Soon"
        width={1682}
        height={224}
        className="h-image-sm md:h-image-md lg:h-image-lg"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
