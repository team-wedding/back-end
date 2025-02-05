"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Account extends sequelize_1.Model {
    static initialize(sequelize) {
        Account.init({
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
            accountHolderName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true
            },
            bankName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            accountNumber: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            kakaoUrl: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'accounts',
            timestamps: true,
        });
    }
}
exports.default = Account;
