import { DataTypes, Model, Sequelize } from "sequelize";
import { User as IUser } from "../interfaces/user.interface";


class User extends Model<IUser>{
  public id!: number;
  public email!: string;
  public name !: string;
  public readonly createdAt !: Date;
  public readonly updatedAt !: Date;
  public provider !: string;
  public hashPassword !: string;
  public salt !: string;

  static initialize(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      provider: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      hashPassword: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(20),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
    }
  )
  }
}

export default User;