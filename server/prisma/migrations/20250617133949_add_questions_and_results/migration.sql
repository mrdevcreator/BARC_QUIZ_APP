/*
  Warnings:

  - You are about to drop the column `questionText` on the `Question` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `submittedAt` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `correctAnswer` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `answers` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `Option_questionId_fkey`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `questionText`,
    ADD COLUMN `options` VARCHAR(191) NULL,
    ADD COLUMN `question` VARCHAR(191) NOT NULL,
    MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `correctAnswer` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Result` DROP COLUMN `submittedAt`,
    DROP COLUMN `total`,
    ADD COLUMN `answers` JSON NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`;

-- DropTable
DROP TABLE `Option`;
