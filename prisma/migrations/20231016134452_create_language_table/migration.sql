-- CreateEnum
CREATE TYPE "translate_type" AS ENUM ('error', 'content');

-- CreateTable
CREATE TABLE "language" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "code" VARCHAR(2) NOT NULL,
    "title" VARCHAR(128) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_code_key" ON "language"("code");
