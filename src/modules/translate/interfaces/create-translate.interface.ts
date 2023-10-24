import { TranslateType } from "@prisma/client"

export declare interface CreateTranslateRequest {
  code: string
  type: TranslateType
  definition: Record<string, any>
}