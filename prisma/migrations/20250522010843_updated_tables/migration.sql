/*
  Warnings:

  - You are about to drop the column `dietaryRestrictions` on the `Invitee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invitee" DROP COLUMN "dietaryRestrictions",
ADD COLUMN     "dieteryRestriction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasPlusOneOption" BOOLEAN NOT NULL DEFAULT false;
