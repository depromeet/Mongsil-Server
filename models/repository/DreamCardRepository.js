const { DreamCardCategory, Category, BigCategory } = require('../index');
const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, title, description, registerDate, transaction) {
    return await Sequelize.DreamCard.create(
      {
        userId: userId,
        title: title,
        description: description,
        registerDate: registerDate,
      },
      { transaction: transaction }
    );
  },
  updateById: async function (
    cardId,
    title,
    description,
    registerDate,
    transaction
  ) {
    console.log(registerDate);

    await Sequelize.DreamCard.update(
      {
        title: title,
        description: description,
        registerDate: registerDate,
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
          include: {
            model: BigCategory,
          },
        },
      },
      where: { userId: userId },
      order: [['registerDate', 'desc']],
    });
  },
  findById: async function (id) {
    return await Sequelize.DreamCard.findAll({
      include: {
        model: DreamCardCategory,
        include: {
          model: Category,
          include: {
            model: BigCategory,
          },
        },
      },
      where: { id: id },
    });
  },
};
