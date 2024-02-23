/*
  Warnings:

  - You are about to drop the column `Address` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "Address",
ADD COLUMN     "address" TEXT;
