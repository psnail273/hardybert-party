"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Invitee } from "@prisma/client";

interface SearchFormProps {
  onInviteeFound?: (invitee: Invitee) => void;
}

export default function SearchForm({ onInviteeFound }: SearchFormProps) {
  const [inviteeName, setInviteeName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [multipleMatches, setMultipleMatches] = useState<Invitee[]>([]);

  const handleInviteeSelect = (invitee: Invitee) => {
    if (onInviteeFound) {
      onInviteeFound(invitee);
    }
    setInviteeName(""); // Clear the form
    setMultipleMatches([]); // Clear the matches list
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setMultipleMatches([]); // Clear any previous matches

    try {
      const response = await fetch(`/api/rsvp?invitee=${inviteeName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (data.invitees.length === 1) {
        if (onInviteeFound) {
          onInviteeFound(data.invitees[0]);
        }
        setInviteeName(""); // Clear the form after successful search
      } else if (data.invitees.length > 1) {
        setMultipleMatches(data.invitees);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact Nick at (314)825-5234."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label htmlFor="invitee">Enter Invitee Name to find RSVP</label>
          <input
            id="invitee"
            value={inviteeName}
            onChange={(e) => setInviteeName(e.target.value)}
            className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
            placeholder="Enter invitee name"
            required
          />
        </div>
        {error && <p className="text-wedding-red text-center">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
        {multipleMatches.length > 0 && (
          <div className="mt-4 space-y-4">
            <p className="text-wedding-green text-center">
              Multiple matches found. Please select your name or search again:
            </p>
            <div className="space-y-4">
              {multipleMatches.map((invitee) => (
                <button
                  key={invitee.id}
                  onClick={() => handleInviteeSelect(invitee)}
                  className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow hover:bg-wedding-yellow hover:text-wedding-blue transition-colors"
                >
                  {invitee.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
