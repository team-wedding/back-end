import { DataTypes, Model, Sequelize } from "sequelize";
import {
  attendanceData,
  AttendanceCreationAttributes,
} from "../interfaces/attendance.interface";

// Attendance 모델 정의
class GuestInfo
  extends Model<attendanceData & { id: number }, AttendanceCreationAttributes>
  implements attendanceData
{
  public id!: number;
  public invitationId!: number;
  public name!: string;
  public contact!: string;
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
        invitationId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "invitations",
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        contact: {
          type: DataTypes.STRING(20),
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
