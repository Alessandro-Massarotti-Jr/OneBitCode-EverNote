/*
  Warnings:

  - Added the required column `authorId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `note` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
