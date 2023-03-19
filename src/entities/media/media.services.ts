import { Inject, Injectable } from "@nestjs/common";
import { MediaContentNotFoundException } from "src/commons";
import { UploadManagerService } from "../uploadmanager/uploadmanger";
import { CreateMediaDto } from "./dto";
import { Media } from "./media.model";
import { MediaRespository, MEDIA_REPOSITORY_KEY } from "./media.repository";



@Injectable()
export class MediaService {
    constructor(
       @Inject(MEDIA_REPOSITORY_KEY) private readonly mediaRepo: MediaRespository,
       private readonly cloudStorageService: UploadManagerService,
    ){}

    
    /**
     * @description Creates new media.
     * @param {CreateMediaDto} mediaDto 
     * @returns 
     */
    async create(mediaDto: CreateMediaDto): Promise<Media> {
        const uploadResponse = await this.cloudStorageService
            .setContents(Buffer.from(mediaDto.content, 'utf-8'))
            .setFolderDestination('public_folder')
            .upload()

        mediaDto.media_url = uploadResponse.url;
        return this.mediaRepo.create(mediaDto)
    }

    /**
     * @description retrieves all media contents.
     * @param {number} page 
     * @param {number} perPage 
     */
    async findContents(page = 1, perPage = 5): Promise<Media[]> {
        const offset = (page - 1) * perPage;
        const limit = perPage;

        return await this.mediaRepo.findContents({ offset, limit})
    }

    /**
     * @description search for media via the description and title.
     * @param {string} query 
     * @returns {Promise<Media[]>}
     */
    async searchContents(query: string): Promise<Media[]> {
        return await this.mediaRepo.searchBy(query);
    }

    /**
     * @description retrieves the media content via ID,
     * @param {string} id 
     * @returns {Promise<Media>}
     */
    async findMediaContent(id: string): Promise<Media> {
        const content = await this.mediaRepo.findContent(id);
        if(!content) throw new MediaContentNotFoundException(`Requested media content does not exists.`);

        return content;
    }

    /**
     * @description removes a media content.
     * @param {string} id 
     * @returns {Promise<boolean>}
     */
    async deleteContent(id: string): Promise<boolean> {
        await this.mediaRepo.delete(id);
        return true;
    }
}