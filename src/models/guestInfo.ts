import { DataTypes, Model, Sequelize } from "sequelize";
import { attendanceData } from "../interfaces/attendance.interface";

// Attendance 모델 정의
class GuestInfo extends Model<attendanceData> implements attendanceData {
  public id!: number; // PK
  public userId!: number; // FK
  public invitationId!: number;
  public name!: string;
  public contact!: string;
  public isDining!: "예정" | "안함" | "미정";
  public attendance!: boolean;
  public isGroomSide!: boolean;
  public isBrideSide!: boolean;
  public companions!: number;

  static initialize(sequelize: Sequelize): void {
    GuestInfo.init(
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
        contact: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        isDining: {
          type: DataTypes.ENUM("예정", "안함", "미정"),
          allowNull: false,
        },
        attendance: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        isGroomSide: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        isBrideSide: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        companions: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "guest_info",
        timestamps: false,
      }
    );
  }
}

export default GuestInfo;
