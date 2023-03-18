import { Injectable } from "@nestjs/common";
import { UpdateMediaDto } from "./dto";
import { Media } from "./media.model";

export const MEDIA_REPOSITORY_KEY = Symbol("MEDIA_REPOSITORY");

export interface MediaRespository {
    findMedia(id: string);
    create(media: unknown);
    delete(id: string);
    update(id: string, updateMediaDto: UpdateMediaDto)
}

@Injectable()
export class MediaRespositoryImpl implements MediaRespository {

    constructor(private readonly media: typeof Media){}


    async findMedia(id: string): Promise<Media | null> {
       return this.media.findByPk(id)
    }

    async create(media: unknown) {
       return await this.media.create(media);
    }

    async delete(id: string) {
        await this.media.destroy({
            where: {
                id
            },
        })
    }

    async update(id: string, updateMediaDto: UpdateMediaDto) {
        return await this.media.update({status: updateMediaDto.status}, {
            where: {
                id
            }
        })
    }
    
}