'use strict';

const ResponseDto = require('../../../dto/ResponseDto');

const dreamRepository = require('../../repository/DreamRepository');

module.exports = class DreamService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
  }

  async findAllCategory() {
    try {
      const noun = await dreamRepository.findAllNoun();
      const verbAndAdjective = await dreamRepository.findAllVerbAndAdjective();

      return {
        noun: noun.map((el) => {
          return {
            name: el.name,
            categories: el.categories.map((category) => category.name),
          };
        }),
        verbAndAdjective: verbAndAdjective.map((el) => el.name),
      };
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
      const verbAndAdjective = await dreamRepository.findAllVerbAndAdjective();

      const newVerbAndAdjective = verbAndAdjective.map((category) => {
        return category.dataValues.name;
      });

      if (!(keword1 && keword2)) {
        mainKeword = keword1 || keword2;
      } else if (newVerbAndAdjective.includes(keword1)) {
        mainKeword = keword1;
        subKeword = keword2;
      } else if (newVerbAndAdjective.includes(keword2)) {
        mainKeword = keword2;
        subKeword = keword1;
      } else {
        mainKeword = keword1;
        subKeword = keword2;
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

      if (!subKeword) {
        return new ResponseDto(200, '필터 개수 조회', { count: result.length });
      }

      return new ResponseDto(200, '필터 개수 조회', {
        count: result.reduce((cnt, dream) => {
          const regex = new RegExp(subKeword);

          return (cnt += Number(regex.test(dream.title)));
        }, 0),
      });
    } catch (err) {
      throw err;
    }
  }

  async findAllDreamFilter() {
    const keword1 = this.query.keword1;
    const keword2 = this.query.keword2;
    let mainKeword;
    let subKeword;

    if (!keword1 && !keword2) {
      return new ResponseDto(400, 'keword는 하나라도 존재해야합니다.');
    }

    try {
      const verbAndAdjective = await dreamRepository.findAllVerbAndAdjective();

      const newVerbAndAdjective = verbAndAdjective.map((category) => {
        return category.dataValues.name;
      });

      if (!(keword1 && keword2)) {
        mainKeword = keword1 || keword2;
      } else if (newVerbAndAdjective.includes(keword1)) {
        mainKeword = keword1;
        subKeword = keword2;
      } else if (newVerbAndAdjective.includes(keword2)) {
        mainKeword = keword2;
        subKeword = keword1;
      } else {
        mainKeword = keword1;
        subKeword = keword2;
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

      const dream = await dreamRepository.findAllCategoryByKeword(categoryId);

      await dreamRepository.updateOnlyHitByKeword(mainKeword, subKeword);

      if (!subKeword) {
        return new ResponseDto(200, '필터 결과 조회', { dream });
      }

      return new ResponseDto(200, '필터 결과 조회', {
        dream: dream.filter((el) => {
          const regex = new RegExp(subKeword);

          return regex.test(el.title);
        }),
      });
    } catch (err) {
      throw err;
    }
  }

  async findAllDreamSearch() {
    const keword = this.query.keword;

    try {
      const categoryId = await dreamRepository.findOneCategoryByKeword(keword);

      if (!categoryId) {
        const dream = await dreamRepository.findAllCategorySearchByKeword(
          keword
        );

        if (!dream.length) {
          return new ResponseDto(202, '검색 결과가 존재하지 않습니다.');
        }

        return new ResponseDto(200, '검색 결과 조회.', { dream });
      }

      const dream = await dreamRepository.findAllCategoryByKeword(categoryId);

      await dreamRepository.updateOnlyHitByKeword(keword);

      return new ResponseDto(200, '검색 결과 조회', { dream });
    } catch (err) {
      throw err;
    }
  }

  async findPopularityKeword() {
    try {
      const categories = await dreamRepository.findPopularityKeword();

      return new ResponseDto(200, '인기검색어 조회', {
        categories: categories.map((el) => el.name),
      });
    } catch (err) {
      throw err;
    }
  }

  async findOneDreamById() {
    try {
      const dream = await dreamRepository.findOneDreamById(this.params.dreamId);

      if (!dream) {
        return new ResponseDto(404, '존재하지 않는 꿈 입니다.');
      }

      return new ResponseDto(200, '꿈 결과 조회', { dream });
    } catch (err) {
      throw err;
    }
  }
};
