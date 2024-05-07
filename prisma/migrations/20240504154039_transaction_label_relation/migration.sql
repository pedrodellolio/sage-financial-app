/*
  Warnings:

  - You are about to drop the `LabelsOnTransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LabelsOnTransactions" DROP CONSTRAINT "LabelsOnTransactions_labelId_fkey";

-- DropForeignKey
ALTER TABLE "LabelsOnTransactions" DROP CONSTRAINT "LabelsOnTransactions_transactionId_fkey";

-- DropTable
DROP TABLE "LabelsOnTransactions";

-- CreateTable
CREATE TABLE "_LabelToTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToTransaction_AB_unique" ON "_LabelToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_LabelToTransaction_B_index" ON "_LabelToTransaction"("B");

-- AddForeignKey
ALTER TABLE "_LabelToTransaction" ADD CONSTRAINT "_LabelToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToTransaction" ADD CONSTRAINT "_LabelToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
