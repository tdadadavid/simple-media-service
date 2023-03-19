import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateMediaDto } from "./dto";
import { Media } from "./media.model";

export const MEDIA_REPOSITORY_KEY = Symbol("MEDIA_REPOSITORY");

export interface MediaRespository {
    findMedia(id: string);
    create(media: unknown);
    delete(id: string);
    update(id: string, updateMediaDto: UpdateMediaDto)
    searchBy(titile: string, description: string): any; //TODO: make the search options generic.
}

@Injectable()
export class MediaRespositoryImpl implements MediaRespository {

    constructor(
        @InjectModel(Media) private readonly media: typeof Media
    ){}


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

    async searchBy(title: string, description: string) {
       
    }

    async update(id: string, updateMediaDto: UpdateMediaDto) {
        return await this.media.update({status: updateMediaDto.status}, {
            where: {
                id
            }
        })
    }
    
}