/*
  Warnings:

  - You are about to alter the column `clothType` on the `Cloth` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `fabricType` to the `Cloth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cloth" ADD COLUMN     "fabricType" INTEGER NOT NULL,
ALTER COLUMN "clothType" SET DATA TYPE INTEGER;
