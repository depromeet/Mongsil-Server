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
      categoryId:{
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
  static associate(db){
    db.Post.belongsTo(db.DreamCard, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'dreamCardId',
      targetKey: 'id'
    }),
    
    db.Post.belongsTo(db.Category, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'categoryId',
      targetKey: 'id'
    })
  }
}

module.exports = DreamCardCategory;