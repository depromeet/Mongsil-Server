const config = require('../../config/config.json');
class DreamCardDto {
  cardList;
  constructor(cardList) {
    this.cardList = this.getDreamList(cardList);
  }
  getDreamList(cardInfo) {
    return cardInfo.map((card) => {
      return new CardList(card.dataValues);
    });
  }
}

class CardList {
  id;
  registerDate;
  title;
  description;
  categories;
  constructor(cardInfo) {
    this.id = String(cardInfo.id);
    this.registerDate = cardInfo.registerDate;
    this.title = cardInfo.title;
    this.description = cardInfo.description;
    this.categories = this.getCategoryList(cardInfo.dream_card_categories);
  }

  getCategoryList(categoryInfo) {
    const result = [];
    for (let i = 0; i < categoryInfo.length; i++) {
      const temp = new CategoryList(categoryInfo[i].dataValues);
      result.push(temp);
      if (i >= 1) break;
    }
    return result;
  }
}

class CategoryList {
  id;
  parentsKeyword;
  name;
  image;
  constructor(category) {
    this.id = String(category.category.dataValues.id);
    this.parentsKeyword =
      category.category.dataValues.big_category.dataValues.name;
    this.name = category.category.dataValues.name;
    this.image =
      config.development.dreamImage + category.category.dataValues.image;
  }
}
module.exports = DreamCardDto;
