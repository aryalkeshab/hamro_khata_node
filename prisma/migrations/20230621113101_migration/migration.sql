/*
  Warnings:

  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `userpermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userpermission` DROP FOREIGN KEY `userPermission_rolesId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`;

-- DropTable
DROP TABLE `userpermission`;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Permission_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rolesPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleid` INTEGER NOT NULL,
    `permissionid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userRolePermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `roleid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rolesPermission` ADD CONSTRAINT `rolesPermission_roleid_fkey` FOREIGN KEY (`roleid`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rolesPermission` ADD CONSTRAINT `rolesPermission_permissionid_fkey` FOREIGN KEY (`permissionid`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userRolePermission` ADD CONSTRAINT `userRolePermission_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userRolePermission` ADD CONSTRAINT `userRolePermission_roleid_fkey` FOREIGN KEY (`roleid`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
