const { now } = require('lodash');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
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
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        registerDate: {
          type: Sequelize.DATEONLY,
        },
      },
      {
        sequelize,
        charset: 'utf8mb4',
        modelName: 'user',
        tableName: 'user',
        timestamps: false,
        underscored: true,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.DreamCard, {
      foreignKey: 'userId',
      sourceKey: 'id',
    }),
      db.User.hasMany(db.UserDream, {
        foreignKey: 'dreamId',
        sourceKey: 'id',
      });
  }

  constructor(dataValues) {
    super();
    this.id = dataValues.id;
    this.name = dataValues.name;
    this.email = dataValues.email;
  }

  get id() {
    return id;
  }
  get name() {
    return name;
  }
  get email() {
    return email;
  }
}

module.exports = User;
