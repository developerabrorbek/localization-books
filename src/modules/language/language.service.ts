import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Language } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLanguageRequest, UpdateLanguageRequest } from './interfaces';

@Injectable()
export class LanguageService {
  #_prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async retrieveLanguageList(): Promise<Language[]> {
    return await this.#_prisma.language.findMany();
  }

  async createLanguage(payload: CreateLanguageRequest): Promise<void> {
    await this.#_checkExistingLanguage(payload.code);

    await this.#_prisma.language.create({
      data: {
        code: payload.code,
        title: payload.title,
      },
    });
  }

  async updateLanguage(
    payload: UpdateLanguageRequest & { id: string },
  ): Promise<void> {
    await this.#_checkLanguage(payload.id);

    await this.#_prisma.language.update({
      where: {
        id: payload.id,
      },
      data: {
        title: payload.title,
      },
    });
  }

  async deleteLanguage(id: string): Promise<void> {
    await this.#_prisma.language.delete({
      where: { id },
    });
  }

  async #_checkExistingLanguage(code: string): Promise<void> {
    const language = await this.#_prisma.language.findFirst({
      where: {
        code,
      },
    });

    if (language) {
      throw new ConflictException(
        `Language ${language.code} is already exists`,
      );
    }
  }

  async #_checkLanguage(id: string) {
    const language = await this.#_prisma.language.findFirst({ where: { id } });

    if (!language) {
      throw new NotFoundException('Language not found');
    }
  }
}
