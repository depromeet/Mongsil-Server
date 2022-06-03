const { d } = require('hangul-js');
const { DreamCardCategory, Category } = require('../index');
const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, title, description, transaction) {
    return await Sequelize.DreamCard.create(
      { userId: userId, title: title, description: description },
      { transaction: transaction }
    );
  },
  updateById: async function (cardId, title, description, transaction) {
    await Sequelize.DreamCard.update(
      {
        title: title,
        description: description,
      },
      { where: { id: cardId } },
      { transaction: transaction }
    );
  },
  deleteById: async function (id, transaction) {
    await Sequelize.DreamCard.destroy(
      { where: { id: id } },
      { transaction: transaction }
    );
  },
  findByUserId: async function (userId) {
    return await Sequelize.DreamCard.findAll({
      include: {
        model: DreamCardCategory,
        include: {
          model: Category,
        },
      },
      where: { userId: userId },
      order: [['registerDate', 'desc']],
    });
  },
};
