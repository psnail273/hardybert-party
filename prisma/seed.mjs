import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create some example households
  const hardybertHousehold = await prisma.household.create({
    data: {
      name: "Hilbert Parents",
      invitees: {
        create: [
          {
            name: "Jeffrey Hilbert",
          },
          {
            name: "Theresa Hilbert",
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
