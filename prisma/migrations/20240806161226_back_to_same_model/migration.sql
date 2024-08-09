/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genres` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `overview` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_B_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "genres" JSONB NOT NULL,
ALTER COLUMN "overview" SET NOT NULL,
ALTER COLUMN "runtime" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "_MovieGenres";
