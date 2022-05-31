const Sequelize = require('../index');
const Op = Sequelize.Op;
module.exports = {
  save: async function (userId, title, description, transaction) {
    return await Sequelize.DreamCard.create(
      { userId: userId, title: title, description: description },
      { transaction: transaction }
    );
  },
};
