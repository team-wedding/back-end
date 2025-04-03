"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Map extends sequelize_1.Model {
    static initialize(sequelize) {
        Map.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            invitationId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'invitations',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            order: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            tMap: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            naverMap: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            kakaoMap: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            personalCar: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            subway: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            bus: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            personalCarContent: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            subwayContent: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            busContent: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'maps',
            timestamps: true,
        });
    }
}
exports.default = Map;
