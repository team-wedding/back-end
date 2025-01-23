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
    public date!: string;
    public location!: string[];
    public imgUrl!: string;
    public contentType!: string;
    public content!: Text;
    public groomFatherName!: string;
    public groomMotherName!: string;
    public brideFatherName!: string;
    public brideMotherName!: string;
    public weddingTime!: string;
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
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          groomName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          brideName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          date: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          location: {
            type: DataTypes.JSON,
            allowNull: false,
          },
          imgUrl: {
            type: DataTypes.STRING(999),
            allowNull: false,
          },
          contentType: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          groomFatherName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          groomMotherName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          brideFatherName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          brideMotherName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          weddingTime: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          groomFatherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          groomMotherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          brideFatherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          brideMotherAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          backgroundColor: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          attendanceTitle: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          attendanceContent: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          attendanceIsDining: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          attendance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          fontSize: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          font: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          audio: {
            type: DataTypes.INTEGER,
            allowNull: false,
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