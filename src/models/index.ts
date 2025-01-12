import { Sequelize } from 'sequelize';
import { config } from '../../config/config';
import UserModel from "./user";
import TokenModel from "./token";
import InvitationModel from "./invitation";
import GuestInfoModel from "./guestInfo";

const sequelize = new Sequelize(config.development as any);

const db: any = {};

// 모델들을 클래스로 정의했기 때문에 initialize 메소드 활용
InvitationModel.initialize(sequelize);
db.Invitation = InvitationModel;
UserModel.initialize(sequelize);
db.User = UserModel;
TokenModel.initialize(sequelize);
db.Token = TokenModel;
GuestInfoModel.initialize(sequelize);
db.GuestInfo = GuestInfoModel;

//테이블 간 관계
db.User.hasMany(db.Invitation, { foreignKey: 'userId' });
db.Invitation.belongsTo(db.User, { foreignKey: 'userId' });
db.Invitation.hasMany(db.GuestInfo, { foreignKey: 'invitationId' });
db.GuestInfo.belongsTo(db.Invitation, { foreignKey: 'invitationId' });

export { sequelize };
export default db;