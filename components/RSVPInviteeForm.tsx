"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HouseholdWithInvitees, InviteeWithHousehold } from "@/types/prisma";
import Image from "next/image";

interface RSVPInviteeFormProps {
  invitee: InviteeWithHousehold;
  household: HouseholdWithInvitees;
  onReset?: () => void;
}

export default function RSVPInviteeForm({ household }: RSVPInviteeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDietaryRestrictions, setHasDietaryRestrictions] = useState<
    boolean | undefined
  >(() => {
    if (household.hasRSVPed) {
      return !!household.hasDietaryRestrictions;
    } else {
      return undefined;
    }
  });
  const [children12, setChildren12] = useState<number | undefined>(() => {
    if (household.hasRSVPed) {
      return household.children12;
    } else {
      return 0;
    }
  });
  const [children3, setChildren3] = useState<number | undefined>(() => {
    if (household.hasRSVPed) {
      return household.children3;
    } else {
      return 0;
    }
  });
  const [attendanceState, setAttendanceState] = useState<
    Record<number, boolean | undefined>
  >(() => {
    const initial: Record<number, boolean | undefined> = {};
    household.invitees.forEach((invitee) => {
      if (household.hasRSVPed) {
        initial[invitee.id] = !!invitee.isAttending;
      } else {
        initial[invitee.id] = undefined;
      }
    });
    return initial;
  });
  const [dietaryRestrictionsNotes, setDietaryRestrictionsNotes] = useState<
    string | undefined
  >(() => {
    if (household.hasRSVPed) {
      return household.dietaryRestrictions ?? undefined;
    } else {
      return undefined;
    }
  });
  const [notes, setNotes] = useState<string | undefined>(() => {
    if (household.hasRSVPed) {
      return household.notes ?? undefined;
    } else {
      return undefined;
    }
  });

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
          household,
          attendanceState,
          children12,
          children3,
          hasDietaryRestrictions,
          dietaryRestrictionsNotes,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // If successful, show success message
      setIsSuccess(true);
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

  function handleAttendanceChange(id: number, value: boolean): void {
    setAttendanceState((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  // If successful, show success message
  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-wedding-yellow mb-4">
            Thank you for RSVPing!
          </h2>
          <p className="text-wedding-yellow">
            We&apos;re excited to celebrate with you! Your RSVP has been
            submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center items-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
    >
      {household.hasRSVPed && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h2 className="w-full font-bold text-center">
            You have already RSVPed. You can make changes below.
          </h2>
          <Image
            src="/DOTLINE.png"
            alt="Decorative dotted line"
            width={6786}
            height={20}
            className="w-full h-1"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
      {household.invitees.map((invitee) => (
        <div
          className="flex flex-col items-center justify-center w-full gap-4"
          key={invitee.id}
        >
          <h2 className="text-2xl w-full font-bold text-center">
            {invitee.name}
          </h2>
          <div className="flex justify-center items-center space-x-4 w-full">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`attending-yes-${invitee.id}`}
                name={`isAttending-${invitee.id}`}
                value="yes"
                checked={attendanceState[invitee.id] === true}
                onChange={() => handleAttendanceChange(invitee.id, true)}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor={`attending-yes-${invitee.id}`}>Attending</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`attending-no-${invitee.id}`}
                name={`isAttending-${invitee.id}`}
                value="no"
                checked={attendanceState[invitee.id] === false}
                onChange={() => handleAttendanceChange(invitee.id, false)}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor={`attending-no-${invitee.id}`}>
                Not Attending
              </label>
            </div>
          </div>
          <Image
            src="/DOTLINE.png"
            alt="Decorative dotted line"
            width={6786}
            height={20}
            className="w-full h-1"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}

      {/* Kids 12 and under - Only show if attending and at least 3 people are in the family */}
      {Object.values(attendanceState).some((value) => value === true) &&
        household.invitees.length >= 2 && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-center items-center space-x-4 w-full">
              <div className="flex items-center space-x-2">
                <p>Number of children aged 3 to 12?</p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="kids-12-and-under"
                  name="kids-12-and-under"
                  value={children12 === 0 ? "" : children12}
                  min={0}
                  max={household.invitees.length}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numeric characters
                    const numericValue = value.replace(/[^0-9]/g, "");
                    setChildren12(
                      Number(numericValue === "" ? 0 : Number(numericValue))
                    );
                  }}
                  placeholder="0"
                  className="text-center w-10 rounded-md border border-wedding-yellow text-wedding-yellow focus:outline-none focus:ring-2 focus:ring-wedding-yellow bg-wedding-blue"
                />
              </div>
            </div>
          </div>
        )}

      {/* Kids under 3 - Only show if attending and at least 3 people are in the family */}
      {Object.values(attendanceState).some((value) => value === true) &&
        household.invitees.length >= 2 && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-center items-center space-x-4 w-full">
              <div className="flex items-center space-x-2">
                <p>Number of children under the age of 3?</p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="kids-under-3"
                  name="kids-under-3"
                  value={children3 === 0 ? "" : children3}
                  min={0}
                  max={household.invitees.length}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numeric characters
                    const numericValue = value.replace(/[^0-9]/g, "");
                    setChildren3(
                      Number(numericValue === "" ? 0 : Number(numericValue))
                    );
                  }}
                  placeholder="0"
                  className="text-center w-10 rounded-md border border-wedding-yellow text-wedding-yellow focus:outline-none focus:ring-2 focus:ring-wedding-yellow bg-wedding-blue"
                />
              </div>
            </div>
            <Image
              src="/DOTLINE.png"
              alt="Decorative dotted line"
              width={6786}
              height={20}
              className="w-full h-1"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

      {/* Dietary Restriction - Only show if attending */}
      {Object.values(attendanceState).some((value) => value === true) && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-center items-center space-x-4 w-full">
            <div className="flex items-center space-x-2">
              <p>Are there any dietary restriction?</p>
              <input
                type="radio"
                id="dietery-yes"
                name="dieteryRestriction"
                value="yes"
                checked={hasDietaryRestrictions === true}
                onChange={() => setHasDietaryRestrictions(true)}
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
                checked={hasDietaryRestrictions === false}
                onChange={() => setHasDietaryRestrictions(false)}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor="dietery-no">No</label>
            </div>
          </div>
          {hasDietaryRestrictions && (
            <textarea
              className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
              rows={6}
              value={dietaryRestrictionsNotes}
              onChange={(e) => setDietaryRestrictionsNotes(e.target.value)}
              placeholder="Please list any dietary restrictions"
            />
          )}
          <Image
            src="/DOTLINE.png"
            alt="Decorative dotted line"
            width={6786}
            height={20}
            className="w-full h-1"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
      <div className="flex w-full">
        <textarea
          className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Please list any other notes for the bride and groom"
        />
      </div>
      {error && <p className="text-wedding-red text-center w-full">{error}</p>}
      <div className="flex flex-col items-center space-y-2 w-full">
        <Button
          type="submit"
          className="bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80 w-full"
          disabled={
            isLoading ||
            Object.values(attendanceState).some(
              (value) => value === undefined
            ) ||
            (Object.values(attendanceState).every(
              (value) => value !== undefined
            ) &&
              Object.values(attendanceState).some((value) => value === true) &&
              hasDietaryRestrictions === undefined)
          }
        >
          {isLoading ? "Submitting..." : "Submit RSVP"}
        </Button>
      </div>
      <p className="text-sm text-center">
        Having trouble? Reach out to Nick and Margaret at (314) 680-4553.
      </p>
    </form>
  );
}
