import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [LanguageController],
  providers: [PrismaService, LanguageService],
})
export class LanguageModule {}
