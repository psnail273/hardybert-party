import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const guestlist = fs.readFileSync("guestlist-dev.txt", "utf8").split("\r\n");
  for (const line of guestlist) {
    const householdInvitees = line.split("\t");
    const householdName = householdInvitees[0].trim();
    const invitees = householdInvitees[1].split(",");
    await prisma.household.create({
      data: {
        name: householdName,
        invitees: {
          create: invitees.map((invitee) => ({ name: invitee.trim() })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
