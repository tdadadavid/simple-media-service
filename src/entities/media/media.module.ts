import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CloudserviceModule } from '../cloudservice/cloudservice.module';
import { MediaController } from './media.controller';
import { Media } from './media.model';
import { MediaRespositoryImpl, MEDIA_REPOSITORY_KEY } from './media.repository';
import { MediaService } from './media.services';

@Module({
  imports: [
    SequelizeModule.forFeature([Media]),
    CloudserviceModule
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
