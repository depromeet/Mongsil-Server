const Sequelize = require('sequelize');

class DreamCard extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    db.User.hasMany(db.DreamCardCategory, {
      foreignKey: 'dreamCardId',
      sourceKey: 'id'
    }),

    db.DreamCard.belongsTo(db.User, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      targetKey: 'id'
    })
  }
}

module.exports = DreamCard;