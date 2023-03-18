import { Injectable } from "@nestjs/common";
import { Optional } from "sequelize";
import { Model, Table } from "sequelize-typescript";


export enum MEDIA_STATUS {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export interface MediaAttributes {
    id: string;
    name: string;
    description: string;
    url: string;
    status: keyof typeof MEDIA_STATUS
    type: string
}

interface MediaCreationAttributes extends Optional<MediaAttributes, "id">{}


@Injectable()
@Table({
    tableName: "media",
    freezeTableName: true,
    timestamps: true
})
export class Media extends Model<MediaAttributes, MediaCreationAttributes>{}