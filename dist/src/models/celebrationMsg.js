"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// celebrationMsg 모델 정의
class CelebrationMsg extends sequelize_1.Model {
    static initialize(sequelize) {
        CelebrationMsg.init({
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
                    model: "invitations",
                    key: "id",
                },
                allowNull: true,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            name: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            imageUrl: {
                type: sequelize_1.DataTypes.JSON,
            },
            message: {
                type: sequelize_1.DataTypes.STRING(300),
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "celebrationMsgs",
            timestamps: true,
        });
    }
}
exports.default = CelebrationMsg;
