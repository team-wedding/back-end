"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
    static initialize(sequelize) {
        Token.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            token: {
                type: sequelize_1.DataTypes.STRING(400),
                allowNull: false
            },
        }, {
            sequelize,
            tableName: 'token',
            timestamps: false,
        });
    }
}
exports.default = Token;
