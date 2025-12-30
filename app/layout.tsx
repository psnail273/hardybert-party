import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// import DevModeBanner from "@/components/DevModeBanner";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"], // 400 is regular, 600 is semi-bold
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicholas Hilbert and Margaret Hardy Wedding Website",
  description: "#Hardybert",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} tracking-default bg-wedding-blue text-wedding-yellow antialiased`}
      >
        {/* <DevModeBanner /> */}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
