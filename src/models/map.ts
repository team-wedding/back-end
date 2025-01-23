import { DataTypes, Model, Sequelize } from "sequelize";
import { MapData } from "../interfaces/map.interface";

class Map extends Model<MapData> implements MapData
{
    public id!: number;
    public invitationId!: number;
    public order!: number;
    public tMap!: boolean;
    public naverMap!: boolean;
    public kakaoMap!: boolean;
    public personalCar!: boolean;
    public subway!: boolean;
    public bus!: boolean;
    public personalCarContent!: string;
    public subwayContent!: string;
    public busContent!: string;

    static initialize(sequelize: Sequelize) {
        Map.init(
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
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                tMap: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                naverMap: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                kakaoMap: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                personalCar: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                subway: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                bus: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                personalCarContent: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                subwayContent: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                busContent: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'maps',
                timestamps: true,
            }
        )
    }
}

export default Map;