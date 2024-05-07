/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[selectedProfileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "User_selectedProfileId_key" ON "User"("selectedProfileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedProfileId_fkey" FOREIGN KEY ("selectedProfileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
