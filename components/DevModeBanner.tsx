"use client";

import { useEffect, useState } from "react";

export default function DevModeBanner() {
  const [isDevMode, setIsDevMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we're in dev mode from environment variable
    const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
    console.log("devMode", devMode);
    setIsDevMode(devMode);
  }, []);

  // Don't render anything if we're not in dev mode
  if (!isDevMode) {
    return null;
  }

  return (
    <div className="bg-wedding-red text-white text-center py-2 px-4 text-sm font-semibold">
      DEVELOPMENT MODE - This is a development environment with test data (RSVP
      password is &ldquo;testing&rdquo;)
    </div>
  );
}
