const config = require('../../config/config.json');
class SaveDreamDto {
  dreamList;
  constructor(dreamInfo) {
    this.dreamList = this.getDreamList(dreamInfo);
  }
  getDreamList(dreamInfo) {
    const result = [];

    for (const dream of dreamInfo) {
      const temp = new DreamList(dream.dataValues);
      result.push(temp);
    }
    return result;
  }
}

class DreamList {
  id;
  dreamId;
  registerDate;
  title;
  description;
  categories;
  constructor(dreamInfo) {
    this.id = String(dreamInfo.id);
    this.dreamId = String(dreamInfo.dreamId);
    this.registerDate = dreamInfo.registerDate;
    this.title = dreamInfo.dream.dataValues.title;
    this.description = dreamInfo.dream.dataValues.description;
    this.categories = this.getCategoryList(
      dreamInfo.dream.dataValues.dream_categories
    );
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
  name;
  image;
  parentsKeyword;
  constructor(category) {
    this.id = String(category.category.dataValues.id);
    this.parentsKeyword =
      category.category.dataValues.big_category.dataValues.name;
    this.name = category.category.dataValues.name;
    this.image =
      config.development.dreamImage + category.category.dataValues.image;
  }
}
module.exports = SaveDreamDto;
