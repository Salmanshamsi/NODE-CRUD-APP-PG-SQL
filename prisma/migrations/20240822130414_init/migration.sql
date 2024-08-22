/*
  Warnings:

  - Added the required column `created_at` to the `todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_at` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "modified_at" TEXT NOT NULL;
