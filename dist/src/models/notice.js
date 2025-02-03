"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Notice extends sequelize_1.Model {
    static initialize(sequelize) {
        Notice.init({
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
            title: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true,
            },
            content: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: true,
            },
            image: {
                type: sequelize_1.DataTypes.STRING(999),
                allowNull: true,
            }
        }, {
            sequelize,
            tableName: 'notices',
            timestamps: true,
        });
    }
}
exports.default = Notice;
