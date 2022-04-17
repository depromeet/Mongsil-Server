const Sequelize = require('sequelize');

class DreamCard extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      userId: {
        type: Sequelize.INTEGER,
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
      modelName: 'dream_card',
      tableName:'dream_card',
    });
  }

  static associate(db){
    db.User.HasMany(db.DreamCardCategory, {
      foreignKey: 'dreamCardId',
      sourceKey: 'id'
    }),

    db.Post.belongsTo(db.User, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      targetKey: 'id'
    })
  }
}

module.exports = DreamCard;