import { Injectable } from "@nestjs/common";
import { cloundinary } from "src/config";

@Injectable()
export class UploadManagerService {
    private contents: Buffer;
    private destinationFolder: string;
    private cloudManager: typeof cloundinary;

    constructor(){
        this.cloudManager = cloundinary;
    }

    public setContents(val: Buffer){
        this.contents = val;
        return this;
    }

    public setFolderDestination(dest: string){
        this.destinationFolder = dest;
        return this;
    }

    public upload(){
        return this.cloudManager.v2.uploader.upload(this.contents.toString(), {
            resource_type: "raw",
            folder: this.destinationFolder,
        })
    }
}