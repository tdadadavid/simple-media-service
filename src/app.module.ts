import { CacheModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileSystemStoredFile, MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, dbOptions } from './config';
import { MediaModule } from './entities/media/media.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 240,
      isGlobal: true,
    }),
    NestjsFormDataModule.config({
      isGlobal: true,
      autoDeleteFile: false,
      storage: config.storageOption === "cloudinary" ? MemoryStoredFile : FileSystemStoredFile,
      fileSystemStoragePath: './uploads'
    }),
    SequelizeModule.forRoot(dbOptions),
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
