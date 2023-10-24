import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UpdateLanguageRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto implements UpdateLanguageRequest {
  @ApiProperty({
    type: String,
    maxLength: 128,
    required: true,
    example: 'Uzbek language'
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  title: string;
}
