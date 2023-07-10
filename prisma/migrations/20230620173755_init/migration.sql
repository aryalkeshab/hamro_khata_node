/*
  Warnings:

  - You are about to drop the column `rolePermissionId` on the `user` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_rolePermissionId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `rolePermissionId`,
    ADD COLUMN `roleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
