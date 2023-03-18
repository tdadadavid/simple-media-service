import { Module } from '@nestjs/common';
import { CloudStorageService } from './cloudservice';

@Module({
    providers: [CloudStorageService],
    exports: [CloudStorageService]
})
export class CloudserviceModule {}
