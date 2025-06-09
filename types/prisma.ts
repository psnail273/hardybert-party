import { Prisma } from "@prisma/client";

export type InviteeWithHousehold = Prisma.InviteeGetPayload<{
  include: { household: true };
}>;

export type HouseholdWithInvitees = Prisma.HouseholdGetPayload<{
  include: { invitees: true };
}>;
