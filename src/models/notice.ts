import { DataTypes, Model, Sequelize } from "sequelize";
import { NoticeData } from "../interfaces/notice.interface";

class Notice extends Model<NoticeData> implements NoticeData
{
    public id!: number;
    public invitationId!: number;
    public isActive!: boolean;
    public order!: number;
    public title!: string;
    public content!: string;
    public image!: string;

    static initialize(sequelize: Sequelize) {
        Notice.init(
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
                isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                title: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                content: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                },
                image: {
                    type: DataTypes.STRING(999),
                    allowNull: true,
                }
            },
            {
                sequelize,
                tableName: 'notices',
                timestamps: true,
            }
        )
    }
}

export default Notice;