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
  categoryList;
  constructor(cardInfo) {
    this.id = String(cardInfo.id);
    this.registerDate = cardInfo.registerDate;
    this.title = cardInfo.title;
    this.description = cardInfo.description;
    this.categoryList = this.getCategoryList(cardInfo.dream_card_categories);
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
  categoryId;
  name;
  image;
  constructor(category) {
    this.categoryId = String(category.category.dataValues.id);
    this.name = category.category.dataValues.name;
    this.image = category.category.dataValues.image;
  }
}
module.exports = DreamCardDto;
