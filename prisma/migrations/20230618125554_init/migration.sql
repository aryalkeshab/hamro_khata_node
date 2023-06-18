-- DropIndex
DROP INDEX `PurchaseOrder_purchaseOrderNo_key` ON `purchaseorder`;

-- AlterTable
ALTER TABLE `purchaseorder` MODIFY `purchaseOrderNo` VARCHAR(191) NULL;
