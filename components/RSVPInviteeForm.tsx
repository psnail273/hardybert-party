"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Invitee } from "@prisma/client";

interface RSVPInviteeFormProps {
  invitee: Invitee;
  onReset?: () => void;
}

export default function RSVPInviteeForm({
  invitee,
  onReset,
}: RSVPInviteeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isAttending, setIsAttending] = useState<string | null>(
    invitee.hasRSVPed ? (invitee.isAttending ? "yes" : "no") : null
  );
  const [plusOne, setPlusOne] = useState<string | null>(
    invitee.hasRSVPed ? (invitee.plusOneIsAttending ? "yes" : "no") : null
  );
  const [isNameSpelledCorrectly, setIsNameSpelledCorrectly] = useState<
    string | null
  >(
    invitee.hasRSVPed
      ? invitee.name === invitee.initialName
        ? "yes"
        : "no"
      : null
  );
  const [fixedName, setFixedName] = useState<string | null>(
    invitee.hasRSVPed
      ? invitee.name !== invitee.initialName
        ? invitee.name
        : null
      : null
  );
  const [plusOneName, setPlusOneName] = useState<string | null>(
    invitee.hasRSVPed ? invitee.plusOneName || null : null
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string | null>(
    invitee.hasRSVPed ? (invitee.dieteryRestriction ? "yes" : "no") : null
  );
  const [plusOneDietaryRestrictions, setPlusOneDietaryRestrictions] = useState<
    string | null
  >(
    invitee.hasRSVPed
      ? invitee.plusOneDietaryRestrictions
        ? "yes"
        : "no"
      : null
  );

  const handleAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAttending(e.target.value);
  };

  const handlePlusOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlusOne(e.target.value);
  };

  const handleIsNameSpelledCorrectlyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsNameSpelledCorrectly(e.target.value);
  };

  const handleFixedNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixedName(e.target.value);
  };

  const handlePlusOneNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlusOneName(e.target.value);
  };

  const handleDietaryRestrictionsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDietaryRestrictions(e.target.value);
  };

  const handlePlusOneDietaryRestrictionsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlusOneDietaryRestrictions(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/rsvp/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inviteeId: invitee.id,
          isAttending,
          isNameSpelledCorrectly,
          fixedName,
          hasPlusOneOption: invitee.hasPlusOneOption,
          plusOne,
          plusOneName,
          dietaryRestrictions,
          plusOneDietaryRestrictions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(
        "Something went wrong. Please try again or contact Nick at (314)825-5234."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-wedding-yellow">
          Thank you for your RSVP!
        </h2>
        <p>We look forward to celebrating with you!</p>
        {onReset && (
          <Button
            onClick={onReset}
            className="bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80"
          >
            RSVP for Another Guest
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full px-2 md:px-4 flex flex-col items-center space-y-4">
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-wedding-yellow">
          Welcome, {invitee.name}!
        </h2>
        {invitee.hasRSVPed ? (
          <p className="text-wedding-yellow/80">
            You can make changes to your RSVP below
          </p>
        ) : (
          <p className="text-wedding-yellow/80">
            Please complete your RSVP below
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full items-center space-y-4">
        {/* Is Attending */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center space-x-2">
              <p className="mr-4">Will you be attending the reception?</p>
              <input
                type="radio"
                id="attending-yes"
                name="isAttending"
                value="yes"
                checked={isAttending === "yes"}
                onChange={handleAttendanceChange}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor="attending-yes">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="attending-no"
                name="isAttending"
                value="no"
                checked={isAttending === "no"}
                onChange={handleAttendanceChange}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor="attending-no">No</label>
            </div>
          </div>
        </div>

        {/* Spelling */}
        {isAttending === "yes" && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2">
                <p className="mr-4">Did I spell your name correctly?</p>
                <input
                  type="radio"
                  id="isNameSpelledCorrectly-yes"
                  name="isNameSpelledCorrectly"
                  value="yes"
                  checked={isNameSpelledCorrectly === "yes"}
                  onChange={handleIsNameSpelledCorrectlyChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="isNameSpelledCorrectly-yes">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="isNameSpelledCorrectly-no"
                  name="isNameSpelledCorrectly"
                  value="no"
                  checked={isNameSpelledCorrectly === "no"}
                  onChange={handleIsNameSpelledCorrectlyChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="isNameSpelledCorrectly-no">No</label>
              </div>
            </div>
          </div>
        )}

        {/* Update name */}
        {isAttending === "yes" && isNameSpelledCorrectly === "no" && (
          <div className="flex flex-col items-center space-y-2">
            <input
              className="rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
              type="text"
              placeholder="Enter your name"
              value={fixedName || ""}
              onChange={handleFixedNameChange}
            />
          </div>
        )}

        {/* Dietery Restriction - Only show if attending */}
        {isAttending === "yes" && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2">
                <p className="mr-4">Do you have any dietary restrictions?</p>
                <input
                  type="radio"
                  id="dietery-yes"
                  name="dieteryRestriction"
                  value="yes"
                  checked={dietaryRestrictions === "yes"}
                  onChange={handleDietaryRestrictionsChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="dietery-yes">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="dietery-no"
                  name="dieteryRestriction"
                  value="no"
                  checked={dietaryRestrictions === "no"}
                  onChange={handleDietaryRestrictionsChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="dietery-no">No</label>
              </div>
            </div>
          </div>
        )}

        {/* Plus One */}
        {isAttending === "yes" && invitee.hasPlusOneOption && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2">
                <p className="mr-4">Do you have a plus one?</p>
                <input
                  type="radio"
                  id="plus-one-yes"
                  name="plusOne"
                  value="yes"
                  checked={plusOne === "yes"}
                  onChange={handlePlusOneChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="plus-one-yes">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="plus-one-no"
                  name="plusOne"
                  value="no"
                  checked={plusOne === "no"}
                  onChange={handlePlusOneChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="plus-one-no">No</label>
              </div>
            </div>
          </div>
        )}

        {/* Plus One Name */}
        {isAttending === "yes" && plusOne === "yes" && (
          <div className="flex flex-col items-center space-y-2">
            <input
              className="rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
              type="text"
              placeholder="Enter your plus one's name"
              value={plusOneName || ""}
              onChange={handlePlusOneNameChange}
            />
          </div>
        )}

        {/* Plus One Dietery Restriction - Only show if plus one is attending */}
        {isAttending === "yes" && plusOne === "yes" && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2">
                <p className="mr-4">
                  Does your plus one have any dietary restrictions?
                </p>
                <input
                  type="radio"
                  id="plus-one-dietery-yes"
                  name="plusOneDieteryRestriction"
                  value="yes"
                  checked={plusOneDietaryRestrictions === "yes"}
                  onChange={handlePlusOneDietaryRestrictionsChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="plus-one-dietery-yes">Yes</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="plus-one-dietery-no"
                  name="plusOneDieteryRestriction"
                  value="no"
                  checked={plusOneDietaryRestrictions === "no"}
                  onChange={handlePlusOneDietaryRestrictionsChange}
                  className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
                />
                <label htmlFor="plus-one-dietery-no">No</label>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-wedding-red text-center">{error}</p>}
        <div className="flex flex-col items-center space-y-2">
          <Button
            type="submit"
            className="bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit RSVP"}
          </Button>
        </div>
      </form>
    </div>
  );
}
