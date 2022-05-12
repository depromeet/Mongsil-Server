const dreamRepository = require("../../repository/DreamRepository");
const { sequelize } = require("../../index");
const UserServiceError = require("../../Error");
const AllCategoryListDto = require("../../../dto/dream/AllCategoryListDto");
module.exports = {
  findAllCategory: async function () {
    const transaction = await sequelize.transaction();
    const categoryInfo = await dreamRepository.findAllCategory(transaction);
    return this.getCategoryList(categoryInfo);
  },
  getCategoryList: function (categoryInfo) {
    const result = [];
    for (let info of categoryInfo) {
      let temp = new AllCategoryListDto(info.id, info.name, info.categories);
      result.push(temp);
    }
    return result;
  },
};
