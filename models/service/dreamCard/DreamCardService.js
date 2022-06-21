const dreamCardRepository = require('../../repository/DreamCardRepository');
const dreamCardCategoryRepository = require('../../repository/DreamCardCategoryRepository');
module.exports = {
  getDreamCard: async function (cardId) {
    const cardInfo = await dreamCardRepository.findById(cardId);
    return cardInfo;
  },
  save: async function (userId, title, description, categories, transaction) {
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
    return cardId.dataValues.id;
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
  delete: async function (idList, transaction) {
    for (let id of idList) {
      await dreamCardCategoryRepository.deleteByCardId(id, transaction);
      await dreamCardRepository.deleteById(id, transaction);
    }
  },
  getDreamCardList: async function (userId) {
    return await dreamCardRepository.findByUserId(userId);
  },
};
