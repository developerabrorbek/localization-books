import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TranslateController],
  providers: [PrismaService, TranslateService],
})
export class TranslateModule {}
