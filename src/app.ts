import { databaseConfig } from '@config';
import { LanguageModule, TranslateModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    PrismaModule,
    LanguageModule,
    TranslateModule,
  ],
})

export class AppModule {}
