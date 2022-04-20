const Sequelize = require('sequelize');

class UserDream extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      userId:{
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
      modelName: 'user_dream',
      tableName:'user_dream',
      timestamps: false
    });
  }

  static associate(db){
    db.UserDream.belongsTo(db.User, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'userId',
      targetKey: 'id'
    }),
    
    db.UserDream.belongsTo(db.Dream, {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      foreignKey: 'dreamId',
      targetKey: 'id'
    })
  }
}

module.exports = UserDream;