const Sequelize = require('sequelize');

class DreamCard extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        title: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: 'utf8',
        modelName: 'dream_card',
        tableName: 'dream_card',
        timestamps: false,
        underscored: true,
      }
    );
  }

  static associate(db) {
    db.DreamCard.hasMany(db.DreamCardCategory, {
      foreignKey: 'dreamCardId',
      sourceKey: 'id',
    }),
      db.DreamCard.belongsTo(db.User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: 'userId',
        sourceKey: 'id',
      });
  }
}

module.exports = DreamCard;
