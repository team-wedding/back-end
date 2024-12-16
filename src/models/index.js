const { Sequelize, DataTypes } = require('sequelize');
const  {development}  = require('../../config/config')

const sequelize = new Sequelize(development)
db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, DataTypes)
db.Token = require('./token')(sequelize, DataTypes)
db.Invitation = require('./invitation')(sequelize, DataTypes)
db.GuestInfo = require('./guestInfo')(sequelize, DataTypes)

db.User.hasMany(db.Invitation, { foreignKey: 'userId' });
db.Invitation.belongsTo(db.User, { foreignKey: 'userId' });
db.Invitation.hasMany(db.GuestInfo, { foreignKey: 'invitationId' });
db.GuestInfo.belongsTo(db.Invitation, { foreignKey: 'invitationId' });

module.exports = db;
