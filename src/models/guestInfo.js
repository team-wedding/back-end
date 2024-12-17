module.exports = (sequelize, DataTypes) => {
  const GuestInfo = sequelize.define(
    "GuestInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      isGroomSide: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      isBrideSide: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      companions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "guest_info",
      timestamps: false,
    }
  );

  return GuestInfo;
};
