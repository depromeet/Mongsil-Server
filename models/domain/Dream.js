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

  static associate(db){
    db.User.HasMany(db.DreamCategory, {
      foreignKey: 'dreamId',
      sourceKey: 'id'
    }),
    db.User.HasMany(db.UserDream, {
      foreignKey: 'dreamId',
      sourceKey: 'id'
    })
  }
}

module.exports = Dream;