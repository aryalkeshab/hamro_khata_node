/*
  Warnings:

  - Added the required column `total` to the `SalesItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salesitems` ADD COLUMN `total` DOUBLE NOT NULL;
