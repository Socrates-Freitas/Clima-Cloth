/*
  Warnings:

  - You are about to drop the column `fabricType` on the `Cloth` table. All the data in the column will be lost.
  - Added the required column `clothCategory` to the `Cloth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cloth" DROP COLUMN "fabricType",
ADD COLUMN     "clothCategory" TEXT NOT NULL,
ALTER COLUMN "clothType" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "clothColor" SET DATA TYPE TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL;
