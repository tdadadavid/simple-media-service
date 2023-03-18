import { Module } from '@nestjs/common';
import { MediaControllerController } from './media-controller/media-controller.controller';

@Module({
  controllers: [MediaControllerController]
})
export class MediaModule {}
