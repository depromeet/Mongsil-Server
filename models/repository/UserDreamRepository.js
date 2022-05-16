const { Category, Dream, DreamCategory } = require("../index");
const moment = require("moment");
const Sequelize = require("../index");
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, dreamId, transaction) {
    await Sequelize.UserDream.create(
      { userId: userId, dreamId: dreamId },
      { transaction: transaction }
    );
  },
  findByUserIdAndDreamId: async function (userId, dreamId, transaction) {
    return await Sequelize.UserDream.findAll(
      {
        where: {
          userId: userId,
          dreamId: dreamId,
        },
      },
      {
        transaction: transaction,
      }
    );
  },
  findByUserIdAndDate: async function (userId, date, transaction) {
    console.log(moment(date).format("YYYY-MM-DD"));
    return await Sequelize.UserDream.findAll(
      {
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
          // registerDate: { [Op.eq]: moment(date).format("YYYY-MM-DD") },
        },
        order: [["registerDate", "desc"]],
      },
      {
        transaction: transaction,
      }
    );
  },
};
