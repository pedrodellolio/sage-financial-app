-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "chartTypeId" TEXT NOT NULL,
    "xAxisOptionId" TEXT NOT NULL,
    "yAxisOptionId" TEXT NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XAxisOptions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "XAxisOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YAxisOptions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "YAxisOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "ChartType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_chartTypeId_fkey" FOREIGN KEY ("chartTypeId") REFERENCES "ChartType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_xAxisOptionId_fkey" FOREIGN KEY ("xAxisOptionId") REFERENCES "XAxisOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_yAxisOptionId_fkey" FOREIGN KEY ("yAxisOptionId") REFERENCES "YAxisOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
