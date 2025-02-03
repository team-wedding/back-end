"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Attendance 모델 정의
class GuestInfo extends sequelize_1.Model {
    static initialize(sequelize) {
        GuestInfo.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                allowNull: false,
            },
            invitationId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'invitations',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            contact: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            isDining: {
                type: sequelize_1.DataTypes.ENUM("예정", "안함", "미정"),
                allowNull: false,
            },
            attendance: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            isGroomSide: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            isBrideSide: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            companions: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "guest_info",
            timestamps: false,
        });
    }
}
exports.default = GuestInfo;
