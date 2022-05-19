const Sequelize = require('sequelize');

class Dream extends Sequelize.Model {
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
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: 'utf8mb4',
        modelName: 'dream',
        tableName: 'dream',
        timestamps: false,
      }
    );
  }

  static associate(db) {
    db.Dream.hasMany(db.DreamCategory, {
      foreignKey: 'dreamId',
      sourceKey: 'id',
    }),
      db.Dream.hasMany(db.UserDream, {
        foreignKey: 'dreamId',
        sourceKey: 'id',
      });
  }
}

module.exports = Dream;
