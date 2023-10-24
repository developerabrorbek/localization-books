-- CreateTable
CREATE TABLE "definition" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "value" VARCHAR NOT NULL,
    "translate_id" UUID NOT NULL,
    "language_id" UUID NOT NULL,

    CONSTRAINT "definition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "definition" ADD CONSTRAINT "definition_translate_id_fkey" FOREIGN KEY ("translate_id") REFERENCES "translate"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "definition" ADD CONSTRAINT "definition_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
