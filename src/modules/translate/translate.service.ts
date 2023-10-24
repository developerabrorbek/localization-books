import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Translate } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateTranslateRequest,
  RetrieveSingleTranslateRequest,
} from './interfaces';
import { RetrieveSingleTranslateResponse } from './interfaces/retrieve-single-translate.interface';

@Injectable()
export class TranslateService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async retrieveTranslateList(): Promise<Translate[]> {
    return await this.#_prisma.translate.findMany({
      select: {
        id: true,
        code: true,
        type: true,
        definition: {
          select: {
            id: true,
            value: true,
          },
        },
      },
    });
  }

  async createTranslate(payload: CreateTranslateRequest): Promise<void> {
    await this.#_checkExistingTranslate(payload.code);

    const translate = await this.#_prisma.translate.create({
      data: {
        code: payload.code,
        type: payload.type,
      },
      select: {
        id: true,
      },
    });

    for (const item of Object.entries(payload.definition)) {
      await this.#_checkLanguage(item[0]);
      const language = await this.#_prisma.language.findFirst({
        where: { code: item[0] },
        select: { id: true },
      });

      await this.#_prisma.definition.create({
        data: {
          languageId: language.id,
          translateId: translate.id,
          value: item[1],
        },
      });
    }
  }

  async retrieveSingleTranslate(
    payload: RetrieveSingleTranslateRequest,
  ): Promise<RetrieveSingleTranslateResponse> {
    await this.#_checkLanguage(payload.languageCode);
    await this.#_checkTranslate(payload.translateId);

    const language = await this.#_prisma.language.findFirst({
      where: { code: payload.languageCode },
      select: {
        id: true,
      },
    });

    const translate = await this.#_prisma.translate.findFirst({
      where: { id: payload.translateId },
      select: {
        id: true,
      },
    });

    const definition = await this.#_prisma.definition.findFirst({
      where: {
        languageId: language.id,
        translateId: translate.id,
      },
      select: {
        value: true,
      },
    });

    return {
      value: definition.value,
    };
  }

  async deleteTranslate(id: string): Promise<void> {
    await this.#_prisma.translate.delete({ where: { id } });
  }

  async #_checkExistingTranslate(code: string): Promise<void> {
    const translate = await this.#_prisma.translate.findFirst({
      where: { code },
    });

    if (translate) {
      throw new ConflictException(
        `Translate with this ${code} code is already exists`,
      );
    }
  }

  async #_checkTranslate(id: string): Promise<void> {
    const translate = await this.#_prisma.translate.findFirst({
      where: { id },
    });

    if (!translate) {
      throw new NotFoundException(`Translate with this ${id} id is not found`);
    }
  }

  async #_checkLanguage(code: string): Promise<void> {
    const language = await this.#_prisma.language.findFirst({
      where: { code },
    });

    if (!language) {
      throw new NotFoundException(`Language ${code} is not found`);
    }
  }
}
