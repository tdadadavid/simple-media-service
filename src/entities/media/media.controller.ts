import { Body, CacheInterceptor, Controller, Delete, Get, Param, Post, Query, UseInterceptors } from "@nestjs/common";
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

    @Get()
    public async getContents(@Query("page") page, @Query("perPage") perPage){
        const contents: any[] = await this.mediaService.findContents(page, perPage);
        return {
            status: "success",
            message: "All media contents",
            data: contents,
        }
    }

    @Get()
    public async searchContents(@Query("title") titile: string, @Query("description") description: string){
        const searchResults: any[] = await this.mediaService.searchContents(titile, description);
        return {
            status: "success",
            message: "Search results",
            data: searchResults,
        }
    }

    @Get("/:id")
    public async getContent(@Param("id") mediaId: string){
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