import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import { Translate } from '@prisma/client';
import { CreateTranslateDto, RetrieveSignleTranslateDto } from './dtos';
import { RetrieveSingleTranslateResponse } from './interfaces/retrieve-single-translate.interface';
import { isUUID } from 'class-validator';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Translate API')
@Controller({
  path: 'translate',
  version: '1.0',
})
export class TranslateController {
  #_service: TranslateService;

  constructor(service: TranslateService) {
    this.#_service = service;
  }

  @ApiResponse({
    isArray: true,
    status: 200,
    schema: {
      example: {
        id: 'ad78969d-e8b0-484f-b7ea-a0864cc533e7',
        code: 'author_utkir_hoshimov',
        type: 'content',
        definition: [
          {
            id: 'ad78969d-e8b0-484f-b7',
            value: 'Definition value',
          },
        ],
      },
    },
  })
  @Get('/all')
  async retrieveTranslateList(): Promise<Translate[]> {
    return await this.#_service.retrieveTranslateList();
  }

  @Post('/add')
  async createTranslate(@Body() payload: CreateTranslateDto): Promise<void> {
    await this.#_service.createTranslate(payload);
  }

  @ApiHeader({
    name: 'language',
    example: 'en',
    required: true,
  })
  @Post('/single')
  @HttpCode(200)
  async retrieveSingleTranslate(
    @Headers('language') languageCode: string,
    @Body() payload: RetrieveSignleTranslateDto,
  ): Promise<RetrieveSingleTranslateResponse> {
    return await this.#_service.retrieveSingleTranslate({
      languageCode,
      ...payload,
    });
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Must be UUID 4',
    required: true,
  })
  @Delete('/delete/:id')
  async deleteTranslate(@Param('id') id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_service.deleteTranslate(id);
  }

  async #_checkUUID(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(`Invalid '${id}' UUID is given`);
    }
  }
}
