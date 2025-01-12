import { DataTypes, Model, Sequelize } from "sequelize";
import { InvitationData } from "../interfaces/invitation.interface";

// Optional 속성 정의 (id와 자동 생성 날짜는 필수가 아님)
interface InvitationCreationAttributes extends Partial<InvitationData> {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date; // 이외에 추가될 선택 기능의 정보들도 추가 예정
  }
  
  // Invitation 모델 정의
  class Invitation
    extends Model<InvitationData & { id: number; createdAt: Date; updatedAt: Date }, InvitationCreationAttributes>
    implements InvitationData
  {
    public id!: number;
    public userId!: number;
    public groomName!: string;
    public brideName!: string;
    public groomContact!: string;
    public brideContact!: string;
    public date!: Date;
    public location!: string;
    public imgUrl!: string;
    public contentType!: '제목' | '인삿말';
    public content!: string;
    public groomFatherName!: string;
    public groomMotherName!: string;
    public brideFatherName!: string;
    public brideMotherName!: string;
    public groomFatherContact!: string;
    public groomMotherContact!: string;
    public brideFatherContact!: string;
    public brideMotherContact!: string;
    public weddingTime!: string;
    public groomFatherAlive!: boolean;
    public groomMotherAlive!: boolean;
    public brideFatherAlive!: boolean;
    public brideMotherAlive!: boolean;
    public font!: string;
    public weight!: string;
    public backgroundColor!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    static initialize(sequelize: Sequelize) {
      Invitation.init(
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
          },
          groomName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          brideName: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
          groomContact: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          brideContact: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          location: {
            type: DataTypes.STRING(45),
            allowNull: false,
          },
          imgUrl: {
            type: DataTypes.STRING(45),
            allowNull: false,
          },
          contentType: {
            type: DataTypes.ENUM('제목', '인삿말'),
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
          groomFatherContact: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          groomMotherContact: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          brideFatherContact: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          brideMotherContact: {
            type: DataTypes.STRING(20),
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
          font: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          weight: {
            type: DataTypes.STRING(20),
            allowNull: false,
          },
          backgroundColor: {
            type: DataTypes.STRING(20),
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
          tableName: 'Invitations',
          timestamps: true,
        }
      );
    }
  }
  
  export default Invitation;