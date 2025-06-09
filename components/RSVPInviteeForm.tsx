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
  const [dietaryRestrictions, setDietaryRestrictions] = useState<
    boolean | undefined
  >(() => {
    if (household.hasRSVPed) {
      return !!household.dieteryRestrictions;
    } else {
      return undefined;
    }
  });
  const [attendanceState, setAttendanceState] = useState<
    Record<number, boolean | undefined>
  >(() => {
    // Initialize with current attendance values from the database
    // unless the household has not RSVPed already
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    //   try {
    //     const response = await fetch("/api/rsvp/submit", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         inviteeId: invitee.id,
    //         isAttending,
    //         isNameSpelledCorrectly,
    //         fixedName,
    //         hasPlusOneOption: invitee.hasPlusOneOption,
    //         plusOne,
    //         plusOneName,
    //         dietaryRestrictions,
    //         plusOneDietaryRestrictions,
    //       }),
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //       setError(data.message);
    //       return;
    //     }

    //     setSuccess(true);
    //   } catch (err) {
    //     setError(
    //       err instanceof Error
    //         ? err.message
    //         : "Something went wrong. Please try again or contact Nick at (314)825-5234."
    //     );
    //   } finally {
    //     setIsLoading(false);
    //   }
  };

  function handleAttendanceChange(id: number, value: boolean): void {
    setAttendanceState((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center items-center w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
    >
      <h1 className="text-2xl font-bold w-full text-center">
        {household.name}
      </h1>
      {household.invitees.map((invitee) => (
        <div
          className="flex flex-col items-center justify-center w-full gap-2"
          key={invitee.id}
        >
          <h2 className="text-xl w-full text-center">{invitee.name}</h2>
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

      {/* Dietary Restriction - Only show if attending */}
      {Object.values(attendanceState).some((value) => value === true) && (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-center items-center space-x-4 w-full">
            <div className="flex items-center space-x-2">
              <p>Are there any dietary restrictions in the family?</p>
              <input
                type="radio"
                id="dietery-yes"
                name="dieteryRestriction"
                value="yes"
                checked={dietaryRestrictions === true}
                onChange={() => setDietaryRestrictions(true)}
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
                checked={dietaryRestrictions === false}
                onChange={() => setDietaryRestrictions(false)}
                className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
              />
              <label htmlFor="dietery-no">No</label>
            </div>
          </div>
          {dietaryRestrictions && (
            <textarea
              className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
              rows={6}
              placeholder="Please list any dietary restrictions"
            />
          )}
        </div>
      )}
      <div className="flex w-full">
        <textarea
          className="w-full rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
          rows={6}
          placeholder="Please list any other notes for the bride and groom"
        />
      </div>
      {error && <p className="text-wedding-red text-center w-full">{error}</p>}
      <div className="flex flex-col items-center space-y-2 w-full">
        <Button
          type="submit"
          className="bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit RSVP"}
        </Button>
      </div>
    </form>
    // <div className="relative w-full px-2 md:px-4 flex flex-col items-center space-y-4">
    //   <div className="w-full text-center">
    //     <h2 className="text-2xl font-bold text-wedding-yellow">
    //       Welcome, {invitee.name}!
    //     </h2>
    //     {invitee.hasRSVPed ? (
    //       <p className="text-wedding-yellow/80">
    //         You can make changes to your RSVP below
    //       </p>
    //     ) : (
    //       <p className="text-wedding-yellow/80">
    //         Please complete your RSVP below
    //       </p>
    //     )}
    //   </div>

    //   <form onSubmit={handleSubmit} className="w-full items-center space-y-4">
    //     {/* Is Attending */}
    //     <div className="flex flex-col space-y-2">
    //       <div className="flex justify-center items-center space-x-4">
    //         <div className="flex items-center space-x-2">
    //           <p className="mr-4">Will you be attending the reception?</p>
    //           <input
    //             type="radio"
    //             id="attending-yes"
    //             name="isAttending"
    //             value="yes"
    //             checked={isAttending === "yes"}
    //             onChange={handleAttendanceChange}
    //             className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //           />
    //           <label htmlFor="attending-yes">Yes</label>
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <input
    //             type="radio"
    //             id="attending-no"
    //             name="isAttending"
    //             value="no"
    //             checked={isAttending === "no"}
    //             onChange={handleAttendanceChange}
    //             className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //           />
    //           <label htmlFor="attending-no">No</label>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Spelling */}
    //     {isAttending === "yes" && (
    //       <div className="flex flex-col space-y-2">
    //         <div className="flex justify-center items-center space-x-4">
    //           <div className="flex items-center space-x-2">
    //             <p className="mr-4">Did I spell your name correctly?</p>
    //             <input
    //               type="radio"
    //               id="isNameSpelledCorrectly-yes"
    //               name="isNameSpelledCorrectly"
    //               value="yes"
    //               checked={isNameSpelledCorrectly === "yes"}
    //               onChange={handleIsNameSpelledCorrectlyChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="isNameSpelledCorrectly-yes">Yes</label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <input
    //               type="radio"
    //               id="isNameSpelledCorrectly-no"
    //               name="isNameSpelledCorrectly"
    //               value="no"
    //               checked={isNameSpelledCorrectly === "no"}
    //               onChange={handleIsNameSpelledCorrectlyChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="isNameSpelledCorrectly-no">No</label>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Update name */}
    //     {isAttending === "yes" && isNameSpelledCorrectly === "no" && (
    //       <div className="flex flex-col items-center space-y-2">
    //         <input
    //           className="rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
    //           type="text"
    //           placeholder="Enter your name"
    //           value={fixedName || ""}
    //           onChange={handleFixedNameChange}
    //         />
    //       </div>
    //     )}

    //     {/* Dietery Restriction - Only show if attending */}
    //     {isAttending === "yes" && (
    //       <div className="flex flex-col space-y-2">
    //         <div className="flex justify-center items-center space-x-4">
    //           <div className="flex items-center space-x-2">
    //             <p className="mr-4">Do you have any dietary restrictions?</p>
    //             <input
    //               type="radio"
    //               id="dietery-yes"
    //               name="dieteryRestriction"
    //               value="yes"
    //               checked={dietaryRestrictions === "yes"}
    //               onChange={handleDietaryRestrictionsChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="dietery-yes">Yes</label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <input
    //               type="radio"
    //               id="dietery-no"
    //               name="dieteryRestriction"
    //               value="no"
    //               checked={dietaryRestrictions === "no"}
    //               onChange={handleDietaryRestrictionsChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="dietery-no">No</label>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Plus One */}
    //     {isAttending === "yes" && invitee.hasPlusOneOption && (
    //       <div className="flex flex-col space-y-2">
    //         <div className="flex justify-center items-center space-x-4">
    //           <div className="flex items-center space-x-2">
    //             <p className="mr-4">Do you have a plus one?</p>
    //             <input
    //               type="radio"
    //               id="plus-one-yes"
    //               name="plusOne"
    //               value="yes"
    //               checked={plusOne === "yes"}
    //               onChange={handlePlusOneChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="plus-one-yes">Yes</label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <input
    //               type="radio"
    //               id="plus-one-no"
    //               name="plusOne"
    //               value="no"
    //               checked={plusOne === "no"}
    //               onChange={handlePlusOneChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="plus-one-no">No</label>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Plus One Name */}
    //     {isAttending === "yes" && plusOne === "yes" && (
    //       <div className="flex flex-col items-center space-y-2">
    //         <input
    //           className="rounded-md border border-wedding-yellow bg-wedding-blue px-3 py-2 text-wedding-yellow placeholder:text-wedding-yellow/50 focus:outline-none focus:ring-2 focus:ring-wedding-yellow"
    //           type="text"
    //           placeholder="Enter your plus one's name"
    //           value={plusOneName || ""}
    //           onChange={handlePlusOneNameChange}
    //         />
    //       </div>
    //     )}

    //     {/* Plus One Dietery Restriction - Only show if plus one is attending */}
    //     {isAttending === "yes" && plusOne === "yes" && (
    //       <div className="flex flex-col space-y-2">
    //         <div className="flex justify-center items-center space-x-4">
    //           <div className="flex items-center space-x-2">
    //             <p className="mr-4">
    //               Does your plus one have any dietary restrictions?
    //             </p>
    //             <input
    //               type="radio"
    //               id="plus-one-dietery-yes"
    //               name="plusOneDieteryRestriction"
    //               value="yes"
    //               checked={plusOneDietaryRestrictions === "yes"}
    //               onChange={handlePlusOneDietaryRestrictionsChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="plus-one-dietery-yes">Yes</label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <input
    //               type="radio"
    //               id="plus-one-dietery-no"
    //               name="plusOneDieteryRestriction"
    //               value="no"
    //               checked={plusOneDietaryRestrictions === "no"}
    //               onChange={handlePlusOneDietaryRestrictionsChange}
    //               className="h-4 w-4 border-wedding-yellow text-wedding-yellow focus:ring-wedding-yellow"
    //             />
    //             <label htmlFor="plus-one-dietery-no">No</label>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {error && <p className="text-wedding-red text-center">{error}</p>}
    //     <div className="flex flex-col items-center space-y-2">
    //       <Button
    //         type="submit"
    //         className="bg-wedding-yellow text-wedding-blue hover:bg-wedding-yellow/80"
    //         disabled={isLoading}
    //       >
    //         {isLoading ? "Submitting..." : "Submit RSVP"}
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
}
