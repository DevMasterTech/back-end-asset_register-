-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Maintenance', 'Damaged', 'Retired');

-- CreateEnum
CREATE TYPE "DepreciationMethod" AS ENUM ('StraightLine', 'DecliningBalance');

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "asset_subtype_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "responsible_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "specifications" JSONB NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lifespan" INTEGER NOT NULL,
    "depreciation_method" "DepreciationMethod" NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetImage" (
    "id" SERIAL NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "image_path" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetSubType" (
    "id" SERIAL NOT NULL,
    "assettype_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssetSubType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "maintenance_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "maintenance_type" TEXT NOT NULL,
    "responsible_id" INTEGER NOT NULL,
    "observations" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsiblePerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "ResponsiblePerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "Depreciation" (
    "id" SERIAL NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "depreciation_value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Depreciation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "origin_branch_id" INTEGER NOT NULL,
    "destination_branch_id" INTEGER NOT NULL,
    "transfer_date" TIMESTAMP(3) NOT NULL,
    "responsible_id" INTEGER NOT NULL,
    "observations" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserRoles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponsiblePerson_code_key" ON "ResponsiblePerson"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_asset_subtype_id_fkey" FOREIGN KEY ("asset_subtype_id") REFERENCES "AssetSubType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetImage" ADD CONSTRAINT "AssetImage_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetSubType" ADD CONSTRAINT "AssetSubType_assettype_id_fkey" FOREIGN KEY ("assettype_id") REFERENCES "AssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "ResponsiblePerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Depreciation" ADD CONSTRAINT "Depreciation_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_origin_branch_id_fkey" FOREIGN KEY ("origin_branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_destination_branch_id_fkey" FOREIGN KEY ("destination_branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "ResponsiblePerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
