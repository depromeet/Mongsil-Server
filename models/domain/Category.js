const Sequelize = require('sequelize');

class Category extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
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
  static associate(db){
    db.User.hasMany(db.DreamCategory, {
      foreignKey: 'categoryId',
      sourceKey: 'id'
    }),
    db.User.hasMany(db.DreamCardCategory, {
      foreignKey: 'categoryId',
      sourceKey: 'id'
    })
  }
}

module.exports = Category;