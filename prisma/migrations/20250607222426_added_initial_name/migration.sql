/*
  Warnings:

  - You are about to drop the column `plusOneHasRSVPed` on the `Invitee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[initialName]` on the table `Invitee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `initialName` to the `Invitee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitee" DROP COLUMN "plusOneHasRSVPed",
ADD COLUMN     "initialName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invitee_initialName_key" ON "Invitee"("initialName");
