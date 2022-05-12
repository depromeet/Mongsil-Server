const dreamService = require("./DreamService");
const dreamRepository = require("../../repository/DreamRepository");
const { sequelize, Dream } = require("../../index");
const should = require("should");
const assert = require("assert");

describe("GET 모든 카테고리 반환", () => {
  describe("success give all category", () => {
    it.only("모든 카테고리 반환", async () => {
      const transaction = await sequelize.transaction();
      const categoryList = await dreamService.findAllCategory();
      const bigcategoryList = await dreamRepository.findBigCategoryCount(
        transaction
      );
      categoryList.length.should.equal(bigcategoryList.length);
    });
  });
});
