import { type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const householdId = searchParams.get("householdId");

  if (!householdId) {
    return new Response(
      JSON.stringify({ message: "Please enter a household id" }),
      {
        status: 400,
      }
    );
  }

  const prisma = new PrismaClient();

  const household = await prisma.household.findUnique({
    where: { id: Number(householdId) },
    include: { invitees: true },
  });

  if (!household) {
    return new Response(
      JSON.stringify({
        message: `No household found matching '${householdId}'. Please try a different id.`,
      }),
      {
        status: 404,
      }
    );
  }

  return new Response(
    JSON.stringify({
      household,
    }),
    {
      status: 200,
    }
  );
}
