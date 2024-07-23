/*
  Warnings:

  - You are about to drop the column `profileId` on the `BudgetGoal` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetGoal" DROP CONSTRAINT "BudgetGoal_profileId_fkey";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BudgetGoal" DROP COLUMN "profileId";

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
