import { DataTypes, Model, Sequelize } from "sequelize";
import { Token as IToken } from "../interfaces/user.interface";

class Token extends Model<IToken>{
  public id!: number;
  public userId !: number;
  public token !: string;
  
  static initialize(sequelize: Sequelize){
    Token.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      token: {
        type: DataTypes.STRING(400),
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'token',
      timestamps: false,
    }
  )
  }
}

export default Token;