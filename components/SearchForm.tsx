"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HouseholdWithInvitees, InviteeWithHousehold } from "@/types/prisma";

interface SearchFormProps {
  onInviteeFound?: (
    invitee: InviteeWithHousehold,
    household: HouseholdWithInvitees
  ) => void;
}

export default function SearchForm({ onInviteeFound }: SearchFormProps) {
  const [inviteeName, setInviteeName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [multipleMatches, setMultipleMatches] = useState<
    InviteeWithHousehold[]
  >([]);
  const [response, setResponse] = useState<{
    inviteesFound: number;
    invitees: InviteeWithHousehold[];
    household: HouseholdWithInvitees;
    message: string;
  } | null>(null);

  // const handleInviteeSelect = (
  //   invitee: InviteeWithHousehold,
  //   household: HouseholdWithInvitees
  // ) => {
  //   if (onInviteeFound) {
  //     onInviteeFound(invitee, household);
  //   }
  //   setInviteeName("");
  //   setMultipleMatches([]);
  // };

  const handleSelectInvitee = async (invitee: InviteeWithHousehold) => {
    try {
      const response = await fetch(
        `/api/household?householdId=${invitee.householdId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (onInviteeFound && data.household) {
        onInviteeFound(invitee, data.household);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setMultipleMatches([]);

    try {
      const response = await fetch(`/api/rsvp?invitee=${inviteeName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResponse(data);

      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (data.inviteesFound === 1) {
        if (onInviteeFound) {
          onInviteeFound(data.invitee, data.household);
        }
        // setInviteeName("");
      } else if (data.inviteesFound > 1) {
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
          {isLoading ? "Loading..." : "Search"}
        </Button>
        {multipleMatches.length > 0 && (
          <div className="mt-4 space-y-4">
            <p className="text-wedding-green text-center">
              {response?.message}
            </p>
            <div className="space-y-4">
              {multipleMatches.map((invitee) => (
                <button
                  key={invitee.id}
                  onClick={() => handleSelectInvitee(invitee)}
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
