import Image from "next/image";

export default function Footer() {
  return (
    <div>
      {/* Divider Image */}
      <div className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/DOTLINE.png"
            alt="Decorative dotted line"
            width={6786}
            height={20}
            className="w-[400%] sm:w-[300%] md:w-[200%] lg:w-screen max-w-none pb-4 sm:pb-6 lg:pb-8"
            priority
          />
          <div>Website by StuffWorks</div>
        </div>
      </div>
    </div>
  );
}
