import { Module } from '@nestjs/common';
import { cloundinary } from 'src/config';
import { UploadManagerService } from './uploadmanger';

@Module({
    providers: [UploadManagerService],
    exports: [UploadManagerService]
})
export class UploadManagerModule {}
