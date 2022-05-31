const dreamCardRepository = require('../../repository/DreamCardRepository');
const dreamCardCategoryRepository = require('../../repository/DreamCardCategoryRepository');
module.exports = {
  save: async function (userId, title, description, categories, transaction) {
    console.log(title);
    const cardId = await dreamCardRepository.save(
      userId,
      title,
      description,
      transaction
    );
    for (let i = 0; i < categories.length; i++) {
      console.log(categories[i]);
      await dreamCardCategoryRepository.save(
        cardId.dataValues.id,
        categories[i],
        transaction
      );
    }
  },
};
