/*
  Warnings:

  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("id");
