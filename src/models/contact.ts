import { DataTypes, Model, Sequelize, STRING } from "sequelize";
import { ContactData } from "../interfaces/contact.interface";

class Contact extends Model<ContactData> implements ContactData
{
    public id!: number;
    public invitationId!: number;
    public isActive!: boolean;
    public order!: number;
    public groomContact!: string;
    public brideContact!: string;
    public groomFatherContact!: string;
    public groomMotherContact!: string;
    public brideFatherContact!: string;
    public brideMotherContact!: string;

    static initialize(sequelize: Sequelize) {
        Contact.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                invitationId: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'invitations',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',  
                    onDelete: 'CASCADE',
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
                },
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                groomContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                brideContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                groomFatherContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                groomMotherContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                brideFatherContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                brideMotherContact: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'contacts',
                timestamps: true,
            }
        )
    }
}

export default Contact;
