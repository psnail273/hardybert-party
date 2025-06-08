"use client";

import { useState } from "react";
import { Invitee } from "@prisma/client";
import SearchForm from "./SearchForm";
import RSVPInviteeForm from "./RSVPInviteeForm";

export default function RSVPWrapper() {
  const [foundInvitee, setFoundInvitee] = useState<Invitee | null>(null);

  const handleInviteeFound = (invitee: Invitee) => {
    setFoundInvitee(invitee);
  };

  const handleReset = () => {
    setFoundInvitee(null);
  };

  if (foundInvitee) {
    return <RSVPInviteeForm invitee={foundInvitee} onReset={handleReset} />;
  }

  return <SearchForm onInviteeFound={handleInviteeFound} />;
}
