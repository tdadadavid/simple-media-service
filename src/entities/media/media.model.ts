import { Injectable } from "@nestjs/common";
import { Optional } from "sequelize";
import { Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, HasMany, Index, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";


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

    @Index('media_name_idx')
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string;

    
    @Default(DEFUALT_MEDIA_STATUS)
    @Index('media_status_idx')
    @Column({
        type: DataType.ENUM(...(typeof MEDIA_STATUS))
    })
    status: string;

    
    @Column(DataType.STRING)
    url: string;


    @Column({
        type: DataType.STRING
    })
    description: string;

    @ForeignKey(() => MediaCategory)
    @Column
    category: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @Column
    @DeletedAt
    deletedAt: Date;
}

@Table({
    tableName: "media_category",
    freezeTableName: true,
    timestamps: true
})
export class MediaCategory extends Model {

    @PrimaryKey
    @Column
    id: string;

    @Unique
    @Column
    category: string;

    @HasMany(() => Media)
    media: Media[]

    @Column({
        allowNull: true
    })
    description: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @Column
    @DeletedAt
    deletedAt: Date;
}