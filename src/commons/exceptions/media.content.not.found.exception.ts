import { HttpException, HttpStatus } from "@nestjs/common";



export class MediaContentNotFoundException extends HttpException {
    constructor(messgae: string){
        super({
            status: "error",
            message: "Media content not found."
        }, HttpStatus.NOT_FOUND)
    }
}