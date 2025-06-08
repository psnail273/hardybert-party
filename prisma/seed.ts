import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create some example households
  const hardybertHousehold = await prisma.household.create({
    data: {
      name: "Hardybert Family",
      invitees: {
        create: [
          {
            initialName: "Nicholas Hilbert",
            name: "Nicholas Hilbert",
            hasPlusOneOption: false,
          },
          {
            initialName: "Margaret Hardy",
            name: "Margaret Hardy",
            hasPlusOneOption: false,
          },
          {
            initialName: "Test",
            name: "Test",
            hasPlusOneOption: true,
          },
        ],
      },
    },
  });

  console.log("Database has been seeded with example data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
