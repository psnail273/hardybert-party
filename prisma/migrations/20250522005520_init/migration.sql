-- CreateTable
CREATE TABLE "Household" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Household_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dietaryRestrictions" BOOLEAN NOT NULL DEFAULT false,
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "plusOneName" TEXT,
    "plusOneDietaryRestrictions" BOOLEAN DEFAULT false,
    "householdId" INTEGER NOT NULL,

    CONSTRAINT "Invitee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Household_name_key" ON "Household"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Invitee_name_key" ON "Invitee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Invitee_plusOneName_key" ON "Invitee"("plusOneName");

-- AddForeignKey
ALTER TABLE "Invitee" ADD CONSTRAINT "Invitee_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
