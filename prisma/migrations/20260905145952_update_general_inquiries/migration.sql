/*
  Warnings:

  - You are about to drop the column `propertyId` on the `inquiries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "inquiries" DROP CONSTRAINT "inquiries_propertyId_fkey";

-- AlterTable
ALTER TABLE "inquiries" DROP COLUMN "propertyId";
