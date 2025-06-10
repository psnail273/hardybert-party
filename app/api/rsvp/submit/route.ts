import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { HouseholdWithInvitees } from "@/types/prisma";

export async function POST(request: NextRequest) {
  const data: {
    household: HouseholdWithInvitees;
    attendanceState: Record<number, boolean | undefined>;
    children12: number;
    children3: number;
    hasDietaryRestrictions: boolean;
    dietaryRestrictionsNotes: string;
    notes: string;
  } = await request.json();

  const prisma = new PrismaClient();

  try {
    // Update each invitee's attendance status
    for (const [inviteeId, isAttending] of Object.entries(
      data.attendanceState
    )) {
      if (isAttending !== undefined) {
        await prisma.invitee.update({
          where: { id: parseInt(inviteeId) },
          data: {
            isAttending: isAttending,
          },
        });
      }
    }

    // Update household RSVP information
    await prisma.household.update({
      where: { id: data.household.id },
      data: {
        hasRSVPed: true,
        hasDietaryRestrictions: data.hasDietaryRestrictions,
        dietaryRestrictions: data.hasDietaryRestrictions
          ? data.dietaryRestrictionsNotes
          : null,
        children12: data.children12,
        children3: data.children3,
        notes: data.notes,
      },
    });

    return new Response(
      JSON.stringify({ message: "RSVP submitted successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return new Response(
      JSON.stringify({ message: "Failed to submit RSVP. Please try again." }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
