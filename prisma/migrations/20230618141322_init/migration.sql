-- DropIndex
DROP INDEX `SalesOrder_salesOrderNo_key` ON `salesorder`;

-- AlterTable
ALTER TABLE `salesorder` MODIFY `salesOrderNo` VARCHAR(191) NULL;
