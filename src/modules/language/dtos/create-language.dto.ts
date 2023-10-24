import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateLanguageRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLanguageDto implements CreateLanguageRequest {
  @ApiProperty({
    type: String,
    maxLength: 2,
    example: 'uz'
  })
  @IsString()
  @MaxLength(2)
  @IsNotEmpty()
  code: string;


  @ApiProperty({
    type: String,
    maxLength: 128,
    example: 'O\'zbek tili'
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  title: string;
}

