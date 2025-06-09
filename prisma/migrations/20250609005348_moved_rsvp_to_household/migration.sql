/*
  Warnings:

  - You are about to drop the column `dieteryRestriction` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `hasPlusOneOption` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `hasRSVPed` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `initialName` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `plusOneDietaryRestrictions` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `plusOneIsAttending` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `plusOneName` on the `Invitee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Invitee` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invitee_initialName_key";

-- DropIndex
DROP INDEX "Invitee_plusOneName_key";

-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "dieteryRestrictions" BOOLEAN,
ADD COLUMN     "hasRSVPed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invitee" DROP COLUMN "dieteryRestriction",
DROP COLUMN "hasPlusOneOption",
DROP COLUMN "hasRSVPed",
DROP COLUMN "initialName",
DROP COLUMN "plusOneDietaryRestrictions",
DROP COLUMN "plusOneIsAttending",
DROP COLUMN "plusOneName",
DROP COLUMN "updatedAt",
ALTER COLUMN "isAttending" DROP NOT NULL,
ALTER COLUMN "isAttending" DROP DEFAULT;
