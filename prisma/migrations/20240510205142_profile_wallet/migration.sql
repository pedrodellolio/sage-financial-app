-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "expensesBrl" DECIMAL(65,30) NOT NULL,
    "incomeBrl" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
