/*
  Warnings:

  - You are about to drop the column `profileId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `walletId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_profileId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "profileId",
ADD COLUMN     "walletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
