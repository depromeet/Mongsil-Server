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
      await dreamCardCategoryRepository.save(
        cardId.dataValues.id,
        categories[i],
        transaction
      );
    }
  },
  update: async function (
    dreamCardId,
    title,
    description,
    categories,
    transaction
  ) {
    await dreamCardCategoryRepository.deleteByCardId(dreamCardId, transaction);
    await dreamCardRepository.updateById(
      dreamCardId,
      title,
      description,
      categories,
      transaction
    );
    for (let i = 0; i < categories.length; i++) {
      await dreamCardCategoryRepository.save(
        dreamCardId,
        categories[i],
        transaction
      );
    }
  },
  delete: async function (dreamCardId, transaction) {
    await dreamCardCategoryRepository.deleteByCardId(dreamCardId, transaction);
    await dreamCardRepository.deleteById(dreamCardId, transaction);
  },
  getDreamCardList: async function (userId) {
    return await dreamCardRepository.findByUserId(userId);
  },
};
