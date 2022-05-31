const { d } = require('hangul-js');
const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, title, description, transaction) {
    return await Sequelize.DreamCard.create(
      { userId: userId, title: title, description: description },
      { transaction: transaction }
    );
  },
  updateByCardId: async function (cardId, title, description, transaction) {
    await Sequelize.DreamCard.update(
      {
        title: title,
        description: description,
      },
      { where: { id: cardId } },
      { transaction: transaction }
    );
  },
};
