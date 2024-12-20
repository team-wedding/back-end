const { Timestamp } = require("firebase-admin/firestore");
const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Invitation = sequelize.define('Invitation', {
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
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      groomMotherAlive: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      brideFatherAlive: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      brideMotherAlive: {
        type: DataTypes.TINYINT(1),
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
      }
    });
  
    return Invitation;
  };
  