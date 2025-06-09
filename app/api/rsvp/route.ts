import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const invitee = searchParams.get("invitee");

  if (!invitee) {
    return new Response(
      JSON.stringify({ message: "Please enter an invitee name" }),
      {
        status: 400,
      }
    );
  }

  const prisma = new PrismaClient();

  // Fuzzy search for invitees in database
  const invitees = await prisma.invitee.findMany({
    where: {
      name: {
        contains: invitee,
        mode: "insensitive", // Case-insensitive search
      },
    },
    take: 5, // Limit to 5 results to avoid overwhelming the user
  });

  if (invitees.length === 0) {
    return new Response(
      JSON.stringify({
        message: `No invitees found matching '${invitee}'. Please try a different name.`,
      }),
      {
        status: 404,
      }
    );
  }

  if (invitees.length === 1) {
    const household = await prisma.household.findUnique({
      where: { id: invitees[0].householdId },
      include: { invitees: true },
    });

    return new Response(
      JSON.stringify({
        inviteesFound: 1,
        invitee: invitees[0],
        household,
        message: "Found exact match",
      }),
      {
        status: 200,
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        inviteesFound: invitees.length,
        invitees,
        message: `Found ${invitees.length} potential matches. Please select the correct name.`,
      }),
      {
        status: 200,
      }
    );
  }
}
