import { DataTypes, Model, Sequelize } from "sequelize";
import { GalleryData } from "../interfaces/gallery.interface";

class Gallery extends Model<GalleryData> implements GalleryData
{
    public id!: number;
    public invitationId!: number;
    public order!: number;
    public images!: string[];
    public grid!: boolean;

    static initialize(sequelize: Sequelize) {
        Gallery.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                invitationId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'invitations',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',  
                    onDelete: 'CASCADE',
                },
                order:{
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                images: {
                    type: DataTypes.JSON,
                    allowNull: true,
                    validate: {
                        isArrayLengthValid(value: any) {
                            if (Array.isArray(value) && value.length > 9) {
                                throw new Error('이미지의 갯수는 9개까지 입니다.');
                            }
                        }
                    }
                },
                grid: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'galleries',
                timestamps: true,
            }
        )
    }
}

export default Gallery;