const Sequelize = require('sequelize');

class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
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
      email:{
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '유효',
      }
    },
    {
      sequelize,
      charset:'utf8',
      modelName: 'user',
      tableName:'user',
      timestamps: false
    });
  }

  static associate(db){
    db.User.hasMany(db.DreamCard, {
      foreignKey: 'userId',
      sourceKey: 'id'
    }),
    db.User.hasMany(db.UserDream, {
      foreignKey: 'userId',
      sourceKey: 'id'
    })
  }
}

module.exports = User;