const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true,
        },
        bigCategoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        charset: 'utf8',
        modelName: 'category',
        tableName: 'category',
        timestamps: false,
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.DreamCategory, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    }),
      db.Category.hasMany(db.DreamCardCategory, {
        foreignKey: 'categoryId',
        sourceKey: 'id',
      }),
      db.Category.belongsTo(db.BigCategory, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: 'bigCategoryId',
        targetKey: 'id',
      });
  }
}

module.exports = Category;
