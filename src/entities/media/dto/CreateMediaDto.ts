import { Allow, IsEnum, IsNotEmpty, IsString, NotEquals } from "class-validator";
import { FileSystemStoredFile, HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";
import { MEDIA_STATUS } from "../media.model";
import "express"



const ALLOWED_MIME_TYPES: string[]  = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "audio/*" //TODO work on finding audio mime types for this
];

export class CreateMediaDto {

    @IsString()
    @IsNotEmpty()
    readonly description: string

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsEnum(MEDIA_STATUS)
    @NotEquals(MEDIA_STATUS["ACTIVE"])
    readonly status: keyof typeof MEDIA_STATUS


    @IsFile()
    @HasMimeType(ALLOWED_MIME_TYPES)
    readonly content: MemoryStoredFile | FileSystemStoredFile;

    @Allow()
    media_url: string;
}