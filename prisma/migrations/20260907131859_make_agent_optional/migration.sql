-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_agentId_fkey";

-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "agentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
