import { DataTypes, Model, Sequelize } from "sequelize";
import { celebrationMsgData } from "../interfaces/celebrationMsg.interface";

// celebrationMsg 모델 정의
class CelebrationMsg extends Model<celebrationMsgData> {
  public id!: number; // PK
  public userId!: number; // FK
  public invitationId!: number;
  public name!: string;
  public password!: string;
  public imageUrl!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    CelebrationMsg.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
        },
        invitationId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'invitations',
            key: 'id',
          },
          allowNull: true,
          onUpdate: 'CASCADE',  
          onDelete: 'CASCADE',
        },
        name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING(500),
        },
        message: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "celebrationMsgs",
        timestamps: true,
      }
    );
  }
}

export default CelebrationMsg;
