import { Inject, Injectable } from "@nestjs/common";
import { MediaContentNotFoundException } from "src/commons";
import { CloudStorageService } from "../cloudservice/cloudservice";
import { CreateMediaDto } from "./dto";
import { MediaRespository, MEDIA_REPOSITORY_KEY } from "./media.repository";



@Injectable()
export class MediaService {
    constructor(
       @Inject(MEDIA_REPOSITORY_KEY) private readonly mediaRepo: MediaRespository,
       private readonly cloudStorageService: CloudStorageService,
    ){}

    
    /**
     * @description Creates new media.
     * @param {CreateMediaDto} mediaDto 
     * @returns 
     */
    async create(mediaDto: CreateMediaDto){
        const uploadResponse = await this.cloudStorageService
            .setContents(Buffer.from(mediaDto.content, 'utf-8'))
            .setFolderDestination('public_folder')
            .upload()

        mediaDto.media_url = uploadResponse.url;
        return this.mediaRepo.create(mediaDto)
    }

    /**
     * @description retrieves the media content via ID,
     * @param {string} id 
     * @returns 
     */
    async findMediaContent(id: string){
        const content = await this.mediaRepo.findMedia(id);
        if(!content) throw new MediaContentNotFoundException(`Requested media content does not exists.`);

        return content;
    }

    /**
     * @description removes a media content.
     * @param {string} id 
     */
    async deleteContent(id: string): Promise<boolean> {
        await this.mediaRepo.delete(id);
        return true;
    }
}