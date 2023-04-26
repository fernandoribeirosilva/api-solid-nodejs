/*
  Warnings:

  - Added the required column `gym_Id` to the `check_in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `check_in` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `latitude` on the `gyms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `gyms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "check_in" ADD COLUMN     "gym_Id" TEXT NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
