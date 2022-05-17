const Sequelize = require("sequelize");

class DreamCardCategory extends Sequelize.Model {
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
        dreamCardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8mb4",
        modelName: "dream_card_category",
        tableName: "dream_card_category",
        timestamps: false,
        underscored: true,
      }
    );
  }
  static associate(db) {
    db.DreamCardCategory.belongsTo(db.DreamCard, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      foreignKey: "dreamCardId",
      sourceKey: "id",
    }),
      db.DreamCardCategory.belongsTo(db.Category, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "categoryId",
        sourceKey: "id",
      });
  }
}

module.exports = DreamCardCategory;
