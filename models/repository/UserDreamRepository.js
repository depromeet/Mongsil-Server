const { Category, Dream, DreamCategory } = require('../index');
const moment = require('moment');
const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, dreamId, transaction) {
    await Sequelize.UserDream.create(
      { userId: userId, dreamId: dreamId },
      { transaction: transaction }
    );
  },
  findByUserIdAndDreamId: async function (userId, dreamId) {
    return await Sequelize.UserDream.findAll({
      where: {
        userId: userId,
        dreamId: dreamId,
      },
    });
  },
  findByUserId: async function (userId) {
    return await Sequelize.UserDream.findAll({
      include: {
        model: Dream,
        include: {
          model: DreamCategory,
          include: {
            model: Category,
          },
        },
      },
      where: {
        userId: userId,
      },
      order: [['registerDate', 'desc']],
    });
  },
  deleteByid: async function (id, transaction) {
    return await Sequelize.UserDream.destroy(
      {
        where: {
          id: id,
        },
      },
      {
        transaction: transaction,
      }
    );
  },
};
