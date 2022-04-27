const Sequelize = require('../index');
module.exports = {
  findAll: async function () {
    return await Sequelize.User.findAll();
  },
  save: async function (userName, userEmail, transaction) {
    const user = await Sequelize.User.create(
      {
        name: userName,
        email: userEmail,
      },
      { transaction: transaction }
    );
    return user;
  },
  findByEmail: async function (userEmail, transaction) {
    const user = await Sequelize.User.findOne(
      {
        where: {
          email: userEmail,
        },
      },
      { transaction: transaction }
    );
    return user;
  },
};
