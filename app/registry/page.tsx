import Image from "next/image";

export default function Registry() {
  return (
    <div className="flex flex-col items-center px-4 gap-4">
      <div className="relative w-full px-2 md:px-4 flex justify-center">
        <Image
          src="/REGISTRY.png"
          alt="Registry"
          width={943}
          height={192}
          className="h-image-sm md:h-image-md lg:h-image-lg"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 justify-center items-center w-full">
        <div className="flex flex-col relative w-full max-w-[32rem]">
          <h1 className="text-center font-semibold text-wedding-red">
            GIFT REGISTRY
          </h1>
          <p className="text-sm text-center">
            We are registered at Amazon.com.
          </p>
          <a
            href="https://www.amazon.com/wedding/share/HARDYBERT"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/AMZ_REGISTRY.webp"
              alt="Amazon Registry"
              width={1864}
              height={1190}
              className="mx-auto rounded-3xl shadow-3xl"
              style={{ objectFit: "contain" }}
            />
          </a>
        </div>
        <div className="flex flex-col relative w-full max-w-[32rem]">
          <h1 className="text-center font-semibold text-wedding-red">
            HONEYMOON FUND
          </h1>
          <p className="text-sm text-center">
            We are planning on an epic road trip to the East Coast, including
            visiting the Spy Museum in D.C., eating lobster in Maine, visiting
            Montreal, seeing Niagara Falls, and exploring whatever other
            roadside attractions we find along the way!
          </p>
          <a
            href="https://account.venmo.com/u/Nicholas-Hilbert-psnail"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/VENMO.jpg"
              alt="Venmo QR Code"
              width={819}
              height={940}
              className="mx-auto rounded-3xl shadow-3xl"
              style={{ objectFit: "contain" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
