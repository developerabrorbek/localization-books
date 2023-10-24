import { TranslateType } from '@prisma/client';
import { CreateTranslateRequest } from '../interfaces';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslateDto implements CreateTranslateRequest {
  @ApiProperty({
    type: String,
    example: 'author_translate_create',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: String,
    example: 'content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: TranslateType;

  @ApiProperty({
    type: Object,
    example: {
      uz: 'Salom',
      en: 'Hello',
    },
    required: true,
  })
  @IsNotEmpty()
  definition: Record<string, any>;
}
