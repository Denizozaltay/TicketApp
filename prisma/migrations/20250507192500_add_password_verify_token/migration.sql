/*
  Warnings:

  - A unique constraint covering the columns `[passwordVerifyToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordVerifyToken" TEXT,
ADD COLUMN     "passwordVerifyTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordVerifyToken_key" ON "User"("passwordVerifyToken");
