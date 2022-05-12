class AllCategoryListDto {
  bigCategoryId;
  bigCategoryName;
  categoryListDto;

  constructor(bigCategoryId, bigCategoryName, categoryList) {
    this.bigCategoryId = bigCategoryId;
    this.bigCategoryName = bigCategoryName;
    this.categoryListDto = this.getCategoryList(categoryList);
  }
  getCategoryList(categoryList) {
    const categoryInfo = [];
    for (let category of categoryList) {
      const temp = new CategoryListDto(category.dataValues);
      categoryInfo.push(temp);
    }
    return categoryInfo;
  }
}

class CategoryListDto {
  categoryId;
  categoryName;
  image;
  constructor(categoryList) {
    this.categoryId = categoryList.id;
    this.categoryName = categoryList.name;
    this.image = categoryList.image;
  }
}
module.exports = AllCategoryListDto;
