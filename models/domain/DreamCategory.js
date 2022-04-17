const Sequelize = require('sequelize');

class DreamCategory extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      categoryId:{
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
      modelName: 'dream_category',
      tableName:'dream_category',
    });
  }
  
  static associate(db){
    db.Post.belongsTo(db.Category, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'categoryId',
      targetKey: 'id'
    }),
    
    db.Post.belongsTo(db.Dream, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'dreamId',
      targetKey: 'id'
    })
  }
}

module.exports = DreamCategory;