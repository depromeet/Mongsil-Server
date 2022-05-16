class SaveDreamDto {
  size;
  dreamList;
  constructor(dreamInfo) {
    this.size = dreamInfo.length;
    this.dreamList = this.getDreamList(dreamInfo);
  }
  getDreamList(dreamInfo) {
    let result = [];

    for (let dream of dreamInfo) {
      let temp = new DreamList(dream.dataValues);
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
  categoryList;
  constructor(dreamInfo) {
    this.id = String(dreamInfo.id);
    this.dreamId = String(dreamInfo.dreamId);
    this.registerDate = dreamInfo.registerDate;
    this.title = dreamInfo.dream.dataValues.title;
    this.description = dreamInfo.dream.dataValues.description;
    this.categoryList = this.getCategoryList(
      dreamInfo.dream.dataValues.dream_categories
    );
  }

  getCategoryList(categoryInfo) {
    let result = [];
    for (let category of categoryInfo) {
      console.log(category);
      let temp = new CategoryList(category.dataValues);
      result.push(temp);
    }
    return result;
  }
}

class CategoryList {
  categoryId;
  name;
  image;
  constructor(category) {
    console.log(category);
    this.categoryId = category.id;
    this.name = category.category.dataValues.name;
    this.image = category.category.dataValues.image;
  }
}
module.exports = SaveDreamDto;
