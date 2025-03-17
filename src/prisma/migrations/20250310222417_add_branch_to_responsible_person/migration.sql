/*
  Warnings:

  - Added the required column `branch_id` to the `ResponsiblePerson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResponsiblePerson" ADD COLUMN     "branch_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ResponsiblePerson" ADD CONSTRAINT "ResponsiblePerson_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
