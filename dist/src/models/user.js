"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: false,
                unique: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
            provider: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false,
            },
            hashPassword: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            salt: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'users',
            timestamps: true,
        });
    }
}
exports.default = User;
