const Sequelize = require("../index");
module.exports = {
  findAll: async function () {
    return await Sequelize.User.findAll();
  },
  save: async function (userName, userEmail, transaction) {
    return await Sequelize.User.create(
      {
        name: userName,
        email: userEmail,
      },
      { transaction: transaction }
    );
  },
  findByEmail: async function (userEmail, transaction) {
    return await Sequelize.User.findOne(
      {
        where: {
          email: userEmail,
        },
      },
      { transaction: transaction }
    );
  },

  deleteById: async function (userId, transaction) {
    await Sequelize.User.destroy(
      {
        where: {
          id: userId,
        },
      },
      { transaction: transaction }
    );
  },
};
