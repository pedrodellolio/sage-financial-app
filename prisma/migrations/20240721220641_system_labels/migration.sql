-- CreateTable
CREATE TABLE "SystemLabel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,

    CONSTRAINT "SystemLabel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemLabel_title_key" ON "SystemLabel"("title");
