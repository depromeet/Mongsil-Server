const Sequelize = require('sequelize');

class Dream extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      description:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      charset:'utf8',
      modelName: 'dream',
      tableName:'dream',
    });
  }
}

module.exports = Dream;