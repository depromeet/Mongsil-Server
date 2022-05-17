const Sequelize = require("sequelize");

class DreamCategory extends Sequelize.Model {
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
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        dreamId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8mb4",
        modelName: "dream_category",
        tableName: "dream_category",
        timestamps: false,
        underscored: true,
      }
    );
  }

  static associate(db) {
    db.DreamCategory.belongsTo(db.Category, {
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      foreignKey: "categoryId",
      sourceKey: "id",
    }),
      db.DreamCategory.belongsTo(db.Dream, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "dreamId",
        sourceKey: "id",
      });
  }
}

module.exports = DreamCategory;
