-- CreateTable
CREATE TABLE "searches" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "repositories" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "searches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "searches" ADD CONSTRAINT "searches_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
