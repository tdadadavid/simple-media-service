import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { PaginationOptions } from "src/types";
import { UpdateMediaDto } from "./dto";
import { Media } from "./media.model";

export const MEDIA_REPOSITORY_KEY = Symbol("MEDIA_REPOSITORY");

export interface MediaRespository {
    findContent(id: string): Promise<Media | null>
    findContents(options: PaginationOptions): Promise<Media[]>
    create(media: unknown): Promise<Media>;
    delete(id: string): Promise<void>;
    update(id: string, updateMediaDto: UpdateMediaDto)
    searchBy(query: string): Promise<Media[]>; //TODO: make the search options generic.
}

@Injectable()
export class MediaRespositoryImpl implements MediaRespository {

    constructor(
        @InjectModel(Media) private readonly media: typeof Media
    ){}


    async findContent(id: string): Promise<Media | null> {
       return this.media.findByPk(id)
    }

    async findContents(options: PaginationOptions): Promise<Media[]>{
        
        return await this.media.findAll({
            where: {
                // @ts-ignore
                deletedAt: null
            },
            offset: options.offset,
            limit: options.limit,
        })
    }

    async create(media: unknown): Promise<Media> {
       return await this.media.create(media);
    }

    async delete(id: string): Promise<void> {
        await this.media.destroy({
            where: {
                id
            },
        })
    }

    async searchBy(query: string): Promise<Media[]> {
        return this.media.findAll({
            where: {
              [Op.or]: [
                { name: { [Op.like]: `%${query}%` } },
                { description: { [Op.like]: `%${query}%` } },
              ],
              // @ts-ignore
              deletedAt: null,
            },
        });
    }

    async update(id: string, updateMediaDto: UpdateMediaDto) {
        await this.media.update({status: updateMediaDto.status}, {
            where: {
                id
            }
        });
    }
    
}