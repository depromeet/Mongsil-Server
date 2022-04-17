const Sequelize = require('sequelize');

class Dream extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
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
    db.User.hasMany(db.DreamCategory, {
      foreignKey: 'dreamId',
      sourceKey: 'id'
    }),
    db.User.hasMany(db.UserDream, {
      foreignKey: 'dreamId',
      sourceKey: 'id'
    })
  }
}

module.exports = Dream;