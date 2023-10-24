import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { RetrieveSingleTranslateRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class RetrieveSignleTranslateDto implements Omit<RetrieveSingleTranslateRequest, "languageCode">{
  @ApiProperty({
    type: String,
    description: "Must be UUID 4",
    required: true,
    example: "ad78969d-e8b0-484f-b7ea-a0864cc533e7"
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  translateId: string;
}