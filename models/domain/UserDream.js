const Sequelize = require('sequelize');

class UserDream extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dreamId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      charset:'utf8',
      modelName: 'user_dream',
      tableName:'user_dream',
    });
  }
}

module.exports = UserDream;