import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const data: {
    inviteeId: number;
    isAttending: string;
    isNameSpelledCorrectly: string;
    fixedName: string;
    hasPlusOneOption: boolean;
    dieteryRestriction: string;
    plusOne: string;
    plusOneName: string;
    plusOneDietaryRestrictions: string;
  } = await request.json();

  const prisma = new PrismaClient();

  const invitee = await prisma.invitee.findUnique({
    where: { id: data.inviteeId },
  });

  if (!invitee) {
    return new Response(JSON.stringify({ message: "Invitee not found" }), {
      status: 404,
    });
  }

  if (data.isNameSpelledCorrectly === "no" && data.fixedName.length < 2) {
    return new Response(
      JSON.stringify({ message: `Name ${data.fixedName} is too short. ` }),
      { status: 400 }
    );
  }
  const fixedName = data.fixedName;
  const isAttending = data.isAttending === "yes";
  const dieteryRestriction = data.dieteryRestriction === "yes";
  if (!data.hasPlusOneOption) {
    await prisma.invitee.update({
      where: { id: data.inviteeId },
      data: {
        isAttending: isAttending,
        hasRSVPed: true,
        name: fixedName,
        dieteryRestriction: dieteryRestriction,
      },
    });
  } else {
    const plusOne = data.plusOne === "yes";
    if (plusOne && data.plusOneName.length < 2) {
      return new Response(
        JSON.stringify({
          message: `Plus one name ${data.plusOneName} is too short. `,
        }),
        { status: 400 }
      );
    }
    const plusOneName = data.plusOneName;
    const plusOneDietaryRestrictions =
      data.plusOneDietaryRestrictions === "yes";

    await prisma.invitee.update({
      where: { id: data.inviteeId },
      data: {
        isAttending: isAttending,
        hasRSVPed: true,
        name: fixedName,
        dieteryRestriction: dieteryRestriction,
        plusOneIsAttending: plusOne,
        plusOneName: plusOneName,
        plusOneDietaryRestrictions: plusOneDietaryRestrictions,
      },
    });
  }

  return new Response(JSON.stringify({ message: "RSVP submitted" }), {
    status: 200,
  });
}
