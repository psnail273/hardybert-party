"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RSVPForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      window.location.reload();
    } catch (err) {
      setError("Something went wrong. Please contact Nick at (314) 825-5234.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label htmlFor="password">Enter RSVP Password from Invitation</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
            placeholder="Enter password"
            required
          />
        </div>
        {error && <p className="text-wedding-red text-center">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
