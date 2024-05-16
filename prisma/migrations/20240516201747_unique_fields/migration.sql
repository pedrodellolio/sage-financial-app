/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Label_title_key" ON "Label"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_title_key" ON "Profile"("title");
