/*
  Warnings:

  - You are about to drop the column `dieteryRestrictions` on the `Household` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Household" DROP COLUMN "dieteryRestrictions",
ADD COLUMN     "dietaryRestrictions" TEXT,
ADD COLUMN     "hasDietaryRestrictions" BOOLEAN;
