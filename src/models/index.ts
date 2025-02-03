import { Sequelize } from 'sequelize';
import { config } from '../../config/config';
import UserModel from "./user";
import TokenModel from "./token";
import InvitationModel from "./invitation";
import GuestInfoModel from "./guestInfo";
import CalendarModel from "./calendar";
import MapModel from "./map";
import GalleryModel from "./gallery";
import AccountModel from "./account";
import ContactModel from "./contact";
import NoticeModel from "./notice";
import CelebrationMsgModel from "./celebrationMsg";

const sequelize = new Sequelize(config.development as any);

const db: any = {};

// 모델들을 클래스로 정의했기 때문에 initialize 메소드 활용
InvitationModel.initialize(sequelize);
db.Invitation = InvitationModel;

TokenModel.initialize(sequelize);
db.Token = TokenModel;

GuestInfoModel.initialize(sequelize);
db.GuestInfo = GuestInfoModel;

CalendarModel.initialize(sequelize);
db.Calendar = CalendarModel;

MapModel.initialize(sequelize);
db.Map = MapModel;

GalleryModel.initialize(sequelize);
db.Gallery = GalleryModel;

AccountModel.initialize(sequelize);
db.Account = AccountModel;

ContactModel.initialize(sequelize);
db.Contact = ContactModel;

NoticeModel.initialize(sequelize);
db.Notice = NoticeModel;

CelebrationMsgModel.initialize(sequelize);
db.CelebrationMsg = CelebrationMsgModel;

UserModel.initialize(sequelize);
db.User = UserModel;

// 테이블 간 관계
db.User.hasMany(db.Invitation, { foreignKey: 'userId' });
db.Invitation.belongsTo(db.User, { foreignKey: 'userId' });

db.Invitation.hasMany(db.GuestInfo, { foreignKey: 'invitationId', as: 'guestInfos' });
db.GuestInfo.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'guestInfos' });

db.Invitation.hasMany(db.Calendar, { foreignKey: 'invitationId', as: 'calendars' });
db.Calendar.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'calendars' });

db.Invitation.hasMany(db.Map, { foreignKey: 'invitationId', as: 'maps' });
db.Map.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'maps' });

db.Invitation.hasMany(db.Gallery, { foreignKey: 'invitationId', as: 'galleries' });
db.Gallery.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'galleries' });

db.Invitation.hasMany(db.Account, { foreignKey: 'invitationId', as: 'accounts'});
db.Account.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'accounts' });

db.Invitation.hasMany(db.Contact, { foreignKey: 'invitationId', as: 'contacts' });
db.Contact.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'contacts' });

db.Invitation.hasMany(db.Notice, { foreignKey: 'invitationId', as: 'notices' });
db.Notice.belongsTo(db.Invitation, { foreignKey: 'invitationId', as: 'notices' });

db.CelebrationMsg.belongsTo(db.User, { foreignKey: "userId" });

db.User.hasOne(db.Token, { foreignKey: 'userId' });
db.Token.belongsTo(db.User, { foreignKey: 'userId' });

export { sequelize };
export default db;