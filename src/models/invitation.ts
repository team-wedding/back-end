import { DataTypes, Model, Sequelize } from "sequelize";
import { InvitationData } from "../interfaces/invitation.interface";
  
  // Invitation 모델 정의
  class Invitation extends Model<InvitationData> implements InvitationData
  {
    public id!: number;
    public userId!: number;
    public title!: string;
    public groomName!: string;
    public brideName!: string;
    public date!: number[];
    public location!: string[];
    public imgUrl!: string;
    public greetingTitle!: string;
    public greetingContent!: Text;
    public groomFatherName!: string;
    public groomMotherName!: string;
    public brideFatherName!: string;
    public brideMotherName!: string;
    public weddingTime!: number[];
    public groomFatherAlive!: boolean;
    public groomMotherAlive!: boolean;
    public brideFatherAlive!: boolean;
    public brideMotherAlive!: boolean;
    public backgroundColor!: string;
    public attendanceTitle!: string;
    public attendanceContent!: Text;
    public attendanceIsDining!: boolean;
    public attendance!: boolean;
    public fontSize!: boolean;
    public font!: string;
    public audio!: number;

    static initialize(sequelize: Sequelize) {
      Invitation.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',  
            onDelete: 'CASCADE',
          },
          title : {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
          groomName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          brideName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          date: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          location: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          imgUrl: {
            type: DataTypes.STRING(999),
            allowNull: true,
          },
          greetingTitle: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          greetingContent: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          groomFatherName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          groomMotherName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          brideFatherName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          brideMotherName: {
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          weddingTime: {
            type: DataTypes.JSON,
            allowNull: true,
          },
          groomFatherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          groomMotherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          brideFatherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          brideMotherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          backgroundColor: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },
          attendanceTitle: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },
          attendanceContent: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          attendanceIsDining: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          attendance: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
          },
          fontSize: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          font: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },
          audio: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
          tableName: 'invitations',
          timestamps: true,
        }
      );
    }
  }
  
  export default Invitation;