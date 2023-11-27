/*
  Warnings:

  - You are about to drop the `searches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "searches" DROP CONSTRAINT "searches_ownerId_fkey";

-- DropTable
DROP TABLE "searches";

-- CreateTable
CREATE TABLE "researches" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "repositories" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "researches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "researches" ADD CONSTRAINT "researches_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
