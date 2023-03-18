import { Module } from '@nestjs/common';
import { CloudserviceModule } from '../cloudservice/cloudservice.module';
import { MediaController } from './media.controller';
import { MediaRespositoryImpl, MEDIA_REPOSITORY_KEY } from './media.repository';

@Module({
  imports: [CloudserviceModule],
  controllers: [MediaController],
  providers: [
    {
      provide: MEDIA_REPOSITORY_KEY,
      useClass: MediaRespositoryImpl,
    }
  ]
})
export class MediaModule {}
