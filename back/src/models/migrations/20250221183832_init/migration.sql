-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPost" (
    "userId" INTEGER NOT NULL,
    "clothName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postText" TEXT NOT NULL,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("userId","clothName","date")
);

-- CreateTable
CREATE TABLE "Cloth" (
    "clothName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "clothType" DOUBLE PRECISION NOT NULL,
    "clothColor" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Cloth_pkey" PRIMARY KEY ("userId","clothName")
);

-- CreateTable
CREATE TABLE "ForecastClothReccomendation" (
    "clothName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "forecastId" INTEGER NOT NULL,

    CONSTRAINT "ForecastClothReccomendation_pkey" PRIMARY KEY ("clothName","forecastId")
);

-- CreateTable
CREATE TABLE "Forecast" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weather" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "rainProbability" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cloth_clothName_key" ON "Cloth"("clothName");

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_clothName_fkey" FOREIGN KEY ("userId", "clothName") REFERENCES "Cloth"("userId", "clothName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cloth" ADD CONSTRAINT "Cloth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "Forecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_clothName_fkey" FOREIGN KEY ("clothName") REFERENCES "Cloth"("clothName") ON DELETE RESTRICT ON UPDATE CASCADE;
