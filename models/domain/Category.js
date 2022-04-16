const Sequelize = require('sequelize');

class Category extends Sequelize.Model{
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
      image:{
        type: Sequelize.STRING(40),
        allowNull: true,
      },
    },
    {
      sequelize,
      charset:'utf8',
      modelName: 'category',
      tableName:'category',
    });
  }
}

module.exports = Category;