"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Invitation 모델 정의
class Invitation extends sequelize_1.Model {
    static initialize(sequelize) {
        Invitation.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            title: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: false,
            },
            groomName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            brideName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            date: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            location: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            imgUrl: {
                type: sequelize_1.DataTypes.STRING(999),
                allowNull: true,
            },
            greetingTitle: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            greetingContent: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            groomFatherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            groomMotherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            brideFatherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            brideMotherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true,
            },
            weddingTime: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            groomFatherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            groomMotherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            brideFatherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            brideMotherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            backgroundColor: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            attendanceTitle: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            attendanceContent: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            attendanceIsDining: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            attendance: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
            fontSize: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            font: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            audio: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'invitations',
            timestamps: true,
        });
    }
}
exports.default = Invitation;
