const Sequelize = require('sequelize');

class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
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
        defaultValue: false,
      }
    },
    {
      sequelize,
      charset:'utf8',
      modelName: 'user',
      tableName:'user',
    });
  }

  static associate(db){
    db.User.HasMany(db.DreamCard, {
      foreignKey: 'userId',
      sourceKey: 'id'
    }),
    db.User.HasMany(db.UserDream, {
      foreignKey: 'userId',
      sourceKey: 'id'
    })
  }
}

module.exports = User;