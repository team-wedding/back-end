import { DataTypes, Model, Sequelize } from "sequelize";
import { AccountData } from "../interfaces/account.interface";

class Account extends Model<AccountData> implements AccountData
{
    public id!: number;
    public invitationId!: number;
    public order!: number;
    public accountHolderName!: string;
    public bankName!: string;
    public accountNumber!: string;
    public kakaoUrl!: string;

    static initialize(sequelize: Sequelize) {
        Account.init(
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
                order: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0,
                },
                accountHolderName: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                bankName: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                accountNumber: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                kakaoUrl: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'accounts',
                timestamps: true,
            }
        )
    }
}

export default Account;
