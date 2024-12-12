module.exports = (sequelize, DataTypes) => {
  const DelUser = sequelize.define('DelUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    createdAt: {
      type:DataTypes.DATE,
      allowNull: true,

    },
    updatedAt: {
      type:DataTypes.DATE,
      allowNull: true,
    },
    deletedAt:{
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      
    }
  },
  {
    tableName: 'deluser',
    timestamps: true
  });
  return DelUser;
}