-- CreateTable
CREATE TABLE "translate" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "code" VARCHAR NOT NULL,
    "type" "translate_type" NOT NULL,

    CONSTRAINT "translate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "translate_code_key" ON "translate"("code");
