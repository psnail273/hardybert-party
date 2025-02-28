"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Navigation() {
  const pathname = usePathname();

  return (
    <div>
      {/* Navigation bar */}
      <nav className="pt-2 sm:pt-4 md:pt-6 lg:pt-8">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link
              href="/"
              className={`hover:underline ${
                pathname === "/" ? "font-semibold text-wedding-red" : ""
              }`}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href="/details"
              className={`hover:underline ${
                pathname === "/details" ? "font-semibold text-wedding-red" : ""
              }`}
            >
              DETAILS
            </Link>
          </li>
          <li>
            <Link
              href="/travel"
              className={`hover:underline ${
                pathname === "/travel" ? "font-semibold text-wedding-red" : ""
              }`}
            >
              TRAVEL
            </Link>
          </li>
          <li>
            <Link
              href="/rsvp"
              className={`hover:underline ${
                pathname === "/rsvp" ? "font-semibold text-wedding-red" : ""
              }`}
            >
              RSVP
            </Link>
          </li>
          <li>
            <Link
              href="/registry"
              className={`hover:underline ${
                pathname === "/registry" ? "font-semibold text-wedding-red" : ""
              }`}
            >
              REGISTRY
            </Link>
          </li>
        </ul>
      </nav>

      {/* Divider Image */}
      <div className="relative py-2 sm:py-4 md:py-6 lg:py-8">
        <Image
          src="/DOTLINE.png"
          alt="Nicholas and Margaret"
          width={6786}
          height={20}
          className="w-full"
          priority
        />
      </div>
    </div>
  );
}
