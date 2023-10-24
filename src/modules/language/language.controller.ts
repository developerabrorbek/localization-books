import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from '@prisma/client';
import { CreateLanguageDto, UpdateLanguageDto } from './dtos';
import { isUUID } from 'class-validator';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Language API')
@Controller({
  path: 'language',
  version: '1.0',
})
export class LanguageController {
  #_service: LanguageService;

  constructor(service: LanguageService) {
    this.#_service = service;
  }

  @ApiResponse({
    isArray: true,
    status: 200,
    schema: {
      example: {
        id: 'b7e094b3-3ce9-44bc-8ccd-a6a54e92ca1e',
        code: 'uz',
        title: 'Uzbek'
      }
    }
  })
  @Get('/all')
  async retrieveLanguageList(): Promise<Language[]> {
    return await this.#_service.retrieveLanguageList();
  }

  @Post('/add')
  async createLanguage(@Body() payload: CreateLanguageDto): Promise<void> {
    await this.#_service.createLanguage(payload);
  }

  @ApiParam({
    name: 'id',
    description: 'Id of the language must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @Patch('/edit/:id')
  @HttpCode(HttpStatus.OK)
  async updateLanguage(
    @Body() payload: UpdateLanguageDto,

    @Param('id')
    id: string,
  ): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.updateLanguage({
      id,
      ...payload,
    });
  }

  @ApiParam({
    name: 'id',
    description: 'Id of the language must be UUID 4',
    example: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
  })
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteLanguage(@Param('id') id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.deleteLanguage(id);
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given '${id}' is not a valid UUID`,
      );
    }
  }
}
