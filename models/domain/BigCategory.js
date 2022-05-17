const Sequelize = require("sequelize");

class BigCategory extends Sequelize.Model {
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
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8mb4",
        modelName: "big_category",
        tableName: "big_category",
        timestamps: false,
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.BigCategory.hasMany(db.Category, {
      foreignKey: "bigCategoryId",
      sourceKey: "id",
    });
  }
}

module.exports = BigCategory;
