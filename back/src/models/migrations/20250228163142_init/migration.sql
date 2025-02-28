-- DropForeignKey
ALTER TABLE "Cloth" DROP CONSTRAINT "Cloth_userId_fkey";

-- DropForeignKey
ALTER TABLE "ForecastClothReccomendation" DROP CONSTRAINT "ForecastClothReccomendation_clothName_fkey";

-- DropForeignKey
ALTER TABLE "ForecastClothReccomendation" DROP CONSTRAINT "ForecastClothReccomendation_forecastId_fkey";

-- DropForeignKey
ALTER TABLE "ForecastClothReccomendation" DROP CONSTRAINT "ForecastClothReccomendation_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPost" DROP CONSTRAINT "UserPost_userId_clothName_fkey";

-- DropForeignKey
ALTER TABLE "UserPost" DROP CONSTRAINT "UserPost_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_clothName_fkey" FOREIGN KEY ("userId", "clothName") REFERENCES "Cloth"("userId", "clothName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cloth" ADD CONSTRAINT "Cloth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "Forecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForecastClothReccomendation" ADD CONSTRAINT "ForecastClothReccomendation_clothName_fkey" FOREIGN KEY ("clothName") REFERENCES "Cloth"("clothName") ON DELETE CASCADE ON UPDATE CASCADE;
