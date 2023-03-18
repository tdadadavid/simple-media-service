import { IsEnum, IsNotEmpty } from "class-validator";
import { MEDIA_STATUS } from "../media.model";


export class UpdateMediaDto {
    @IsEnum(MEDIA_STATUS)
    @IsNotEmpty()
    status: keyof typeof MEDIA_STATUS    
}