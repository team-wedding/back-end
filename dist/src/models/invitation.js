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
                allowNull: false,
            },
            brideName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false,
            },
            location: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false,
            },
            imgUrl: {
                type: sequelize_1.DataTypes.STRING(999),
                allowNull: false,
            },
            greetingTitle: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            greetingContent: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            groomFatherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            groomMotherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            brideFatherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            brideMotherName: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
            },
            weddingTime: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: false,
            },
            groomFatherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            groomMotherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            brideFatherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            brideMotherAlive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            backgroundColor: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            attendanceTitle: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            attendanceContent: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            attendanceIsDining: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            attendance: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
            },
            fontSize: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            font: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
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
