import Image from "next/image";
import { cookies } from "next/headers";
import PasswordForm from "@/components/PasswordForm";
import RSVPWrapper from "@/components/RSVPWrapper";

export default async function RSVP() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("isLoggedIn")?.value;

  return (
    <div className="relative w-full px-2 md:px-4 flex flex-col items-center space-y-4">
      <Image
        src="/RSVP.png"
        alt="RSVP"
        width={493}
        height={185}
        className="h-image-sm md:h-image-md lg:h-image-lg"
        style={{ objectFit: "contain" }}
        priority
      />
      <div className="w-full">
        {!isLoggedIn ? <PasswordForm /> : <RSVPWrapper />}
      </div>
    </div>
  );
}
