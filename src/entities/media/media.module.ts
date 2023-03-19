import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UploadManagerModule } from '../uploadmanager/uploadmanger.module';
import { MediaController } from './media.controller';
import { Media } from './media.model';
import { MediaRespositoryImpl, MEDIA_REPOSITORY_KEY } from './media.repository';
import { MediaService } from './media.services';

@Module({
  imports: [
    SequelizeModule.forFeature([Media]),
    UploadManagerModule
  ],
  controllers: [MediaController],
  providers: [
    {
      provide: MEDIA_REPOSITORY_KEY,
      useClass: MediaRespositoryImpl,
    },
    MediaService,
    MediaRespositoryImpl
  ]
})
export class MediaModule {}
