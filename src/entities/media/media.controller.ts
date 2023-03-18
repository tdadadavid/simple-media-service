import { Body, CacheInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { CreateMediaDto } from "./dto";
import { MediaService } from "./media.services";


@UseInterceptors(CacheInterceptor)
@Controller("media")
export class MediaController {
    constructor(private readonly mediaService: MediaService){}


    @Post()
    public async createMedia(@Body() createMedia: CreateMediaDto){
        const data = await this.mediaService.create(createMedia);
        return {
            status: "success",
            message: "Media content successfully created",
            data
        }
    }


    @Get("/:id")
    public async getMedia(@Param("id") mediaId: string){
      const media = await this.mediaService.findMediaContent(mediaId);
      return {
        status: "success",
        message: "Media retrieved succesfully",
        data: media
      }
    }

    @Delete("/:id")
    public async removeMedia(@Param("id") mediaId: string){
        this.mediaService.deleteContent(mediaId);
        return {
            status: "success",
            message: "Media removed succesfully"
        }
    }


}