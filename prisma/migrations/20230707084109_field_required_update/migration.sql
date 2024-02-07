/*
  Warnings:

  - Made the column `title` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pomodoro` on table `Timersetting` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortBreak` on table `Timersetting` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longBreak` on table `Timersetting` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "tomato" DROP NOT NULL,
ALTER COLUMN "completedOn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Timersetting" ALTER COLUMN "pomodoro" SET NOT NULL,
ALTER COLUMN "shortBreak" SET NOT NULL,
ALTER COLUMN "longBreak" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
