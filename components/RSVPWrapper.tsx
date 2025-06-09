"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import RSVPInviteeForm from "./RSVPInviteeForm";
import { HouseholdWithInvitees, InviteeWithHousehold } from "@/types/prisma";

export default function RSVPWrapper() {
  const [foundInvitee, setFoundInvitee] = useState<InviteeWithHousehold | null>(
    null
  );
  const [foundHousehold, setFoundHousehold] =
    useState<HouseholdWithInvitees | null>(null);

  const handleInviteeFound = (
    invitee: InviteeWithHousehold,
    household: HouseholdWithInvitees
  ) => {
    setFoundInvitee(invitee);
    setFoundHousehold(household);
  };

  const handleReset = () => {
    setFoundInvitee(null);
    setFoundHousehold(null);
  };

  if (foundInvitee && foundHousehold) {
    return (
      <RSVPInviteeForm
        invitee={foundInvitee}
        household={foundHousehold}
        onReset={handleReset}
      />
    );
  }

  return <SearchForm onInviteeFound={handleInviteeFound} />;
}
