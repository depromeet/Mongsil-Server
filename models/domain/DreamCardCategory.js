const Sequelize = require('sequelize');

class DreamCardCategory extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      dreamCardId:{
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
      modelName: 'dream_card_category',
      tableName:'dream_card_category',
    });
  }
}

module.exports = DreamCardCategory;