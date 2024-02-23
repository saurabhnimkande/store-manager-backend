/*
  Warnings:

  - A unique constraint covering the columns `[clientName]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_clientName_key" ON "clients"("clientName");
