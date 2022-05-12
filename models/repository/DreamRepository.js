const { Category } = require("../index");
const Sequelize = require("../index");
module.exports = {
  findAllCategory: async function (transaction) {
    return Sequelize.BigCategory.findAll({
      include: [
        {
          model: Category,
          attributes: ["bigCategoryId", "id", "name", "image"],
        },
      ],
      transaction: transaction,
    });
  },
  findBigCategoryCount: async function (transaction) {
    return Sequelize.BigCategory.findAll();
  },
};
