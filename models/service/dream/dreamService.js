'use strict';

const ResponseDto = require('../../../dto/ResponseDto');

const dreamRepository = require('../../repository/dreamRepository');

module.exports = class DreamService {
  constructor(req) {
    this.query = req.query;
  }

  async findAllCategory() {
    try {
      const category = await dreamRepository.findAllCategory();
      const noun = category.noun.map((el) => {
        return {
          name: el.name,
          categories: el.categories.map((category) => category.name),
        };
      });
      const verbAndAdjective = category.verbAndAdjective.map((el) => el.name);

      return { noun, verbAndAdjective };
    } catch (err) {
      throw err;
    }
  }

  async countDreamFilter() {
    const keword1 = this.query.keword1;
    const keword2 = this.query.keword2;
    let mainKeword;
    let subKeword;

    if (!keword1 && !keword2) {
      return new ResponseDto(400, 'keword는 하나라도 존재해야합니다.');
    }

    try {
      const { verbAndAdjective } = await dreamRepository.findAllCategory();

      const newVerbAndAdjective = verbAndAdjective.map((category) => {
        return category.dataValues.name;
      });

      if (!(keword1 && keword2)) {
        mainKeword = keword1 || keword2;
      } else if (newVerbAndAdjective.includes(keword1)) {
        mainKeword = keword1;
        subKeword = keword2;
      } else {
        mainKeword = keword2;
        subKeword = keword1;
      }

      const categoryId = await dreamRepository.findOneCategoryByKeword(
        mainKeword
      );

      if (!categoryId) {
        return new ResponseDto(
          400,
          '존재하지 않는 카테고리 입니다.',
          mainKeword
        );
      }

      const result = await dreamRepository.findAllCategoryByKeword(categoryId);

      return new ResponseDto(200, '필터 개수 조회', { count: result.length });
    } catch (err) {
      throw err;
    }
  }
};
