/*
  Warnings:

  - Added the required column `createdBy` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;
