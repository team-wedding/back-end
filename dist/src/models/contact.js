"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Contact extends sequelize_1.Model {
    static initialize(sequelize) {
        Contact.init({
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
            groomContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            brideContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            groomFatherContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            groomMotherContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            brideFatherContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            brideMotherContact: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'contacts',
            timestamps: true,
        });
    }
}
exports.default = Contact;
