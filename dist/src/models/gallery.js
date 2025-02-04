"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Gallery extends sequelize_1.Model {
    static initialize(sequelize) {
        Gallery.init({
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
            },
            images: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
                validate: {
                    isArrayLengthValid(value) {
                        if (Array.isArray(value) && value.length > 9) {
                            throw new Error('이미지의 갯수는 9개까지 입니다.');
                        }
                    }
                }
            },
            grid: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'galleries',
            timestamps: true,
        });
    }
}
exports.default = Gallery;
