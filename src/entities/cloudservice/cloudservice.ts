import { cloundinary } from "src/config";


export class CloudStorageService {
    private contents: Buffer;
    private destinationFolder: string;

    constructor(private cloudManager: typeof cloundinary){}

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
            resource_type: "raw"
        })
    }
}