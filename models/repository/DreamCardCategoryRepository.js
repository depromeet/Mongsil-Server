const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (cardId, categoryId, transaction) {
    await Sequelize.DreamCardCategory.create(
      { dreamCardId: cardId, categoryId: categoryId },
      { transaction: transaction }
    );
  },
  deleteByCardId: async function (cardId, transaction) {
    await Sequelize.DreamCardCategory.destroy(
      {
        where: {
          dreamCardId: cardId,
        },
      },
      {
        transaction: transaction,
      }
    );
  },
};
