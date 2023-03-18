import { CacheModule, Module } from '@nestjs/common';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 240,
      isGlobal: true,
    }),
    NestjsFormDataModule.config({
      isGlobal: true,
      autoDeleteFile: false,
      storage: MemoryStoredFile,
    }),
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
