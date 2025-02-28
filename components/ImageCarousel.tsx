"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Time in milliseconds between transitions
  width: number;
  height: number;
}

export default function ImageCarousel({
  images,
  interval = 3000,
  width,
  height,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    // Set up the interval for auto-cycling
    const timer = setInterval(() => {
      // Start the transition
      setIsTransitioning(true);

      // Calculate the next index
      const next = (currentIndex + 1) % images.length;
      setNextIndex(next);

      // After the fade-out completes, change the image
      setTimeout(() => {
        setCurrentIndex(next);
        // Start fade-in
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, interval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [currentIndex, images.length, interval]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <Image
          src={images[currentIndex]}
          alt={`Heart image ${currentIndex + 1}`}
          width={width}
          height={height}
          className="mx-auto"
          priority={currentIndex === 0}
        />
      </div>

      {/* Preload the next image */}
      <div className="hidden">
        <Image
          src={images[nextIndex]}
          alt={`Preload image ${nextIndex + 1}`}
          width={width}
          height={height}
          priority={false}
        />
      </div>
    </div>
  );
}
