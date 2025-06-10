"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="pt-4 sm:pt-6">
        {/* Mobile hamburger menu */}
        <div className="md:hidden flex justify-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* X menu */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  stroke="#E9C5DA" /* wedding-purple */
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                {/* Hamburger menu */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16"
                  stroke="#5DE8A5" /* wedding-green */
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 12h16"
                  stroke="#FFBE0B" /* wedding-yellow */
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 18h16"
                  stroke="#FF85A1" /* wedding-pink */
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-2">
            <li>
              <Link
                href="/"
                className={`hover:underline ${
                  pathname === "/" ? "text-wedding-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                DETAILS
              </Link>
            </li>
            {/* <li>
              <Link
                href="/details"
                className={`hover:underline ${
                  pathname === "/details" ? "text-wedding-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                DETAILS
              </Link>
            </li> */}
            <li>
              <Link
                href="/travel"
                className={`hover:underline ${
                  pathname === "/travel" ? "text-wedding-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                TRAVEL
              </Link>
            </li>
            <li>
              <Link
                href="/rsvp"
                className={`hover:underline ${
                  pathname === "/rsvp" ? "text-wedding-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                RSVP
              </Link>
            </li>
            <li>
              <Link
                href="/registry"
                className={`hover:underline ${
                  pathname === "/registry" ? "text-wedding-red" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                REGISTRY
              </Link>
            </li>
          </ul>
        )}

        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center space-x-6">
          <li>
            <Link
              href="/"
              className={`hover:underline ${
                pathname === "/" ? "text-wedding-red" : ""
              }`}
            >
              DETAILS
            </Link>
          </li>
          {/* <li>
            <Link
              href="/details"
              className={`hover:underline ${
                pathname === "/details" ? "text-wedding-red" : ""
              }`}
            >
              DETAILS
            </Link>
          </li> */}
          <li>
            <Link
              href="/travel"
              className={`hover:underline ${
                pathname === "/travel" ? "text-wedding-red" : ""
              }`}
            >
              TRAVEL
            </Link>
          </li>
          <li>
            <Link
              href="/rsvp"
              className={`hover:underline ${
                pathname === "/rsvp" ? "text-wedding-red" : ""
              }`}
            >
              RSVP
            </Link>
          </li>
          <li>
            <Link
              href="/registry"
              className={`hover:underline ${
                pathname === "/registry" ? "text-wedding-red" : ""
              }`}
            >
              REGISTRY
            </Link>
          </li>
        </ul>
      </nav>

      {/* Divider Image */}
      <div className="relative py-4 sm:py-6 lg:py-8 overflow-hidden">
        <div className="w-full flex justify-center">
          <Image
            src="/DOTLINE.png"
            alt="Decorative dotted line"
            width={6786}
            height={20}
            className="w-[400%] sm:w-[300%] md:w-[200%] lg:w-screen max-w-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}
