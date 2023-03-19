import { Injectable } from "@nestjs/common";
import { Optional } from "sequelize";
import { Column, DataType, Default, Model, Table } from "sequelize-typescript";


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

const DEFUALT_MEDIA_STATUS: keyof typeof MEDIA_STATUS = "ACTIVE"

interface MediaCreationAttributes extends Optional<MediaAttributes, "id">{}


@Injectable()
@Table({
    tableName: "media",
    freezeTableName: true,
    timestamps: true
})
export class Media extends Model<MediaAttributes, MediaCreationAttributes>{

    @Column({
        unique: true,
        type: DataType.UUID,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string;

    
    @Column({
        type: DataType.ENUM(...(typeof MEDIA_STATUS))
    })
    @Default(DEFUALT_MEDIA_STATUS)
    status: string;


    @Column(DataType.STRING)
    url: string;


    @Column({
        type: DataType.STRING
    })
    description: string;
}