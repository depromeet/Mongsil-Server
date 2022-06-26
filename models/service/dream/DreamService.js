'use strict';

const hangul = require('hangul-js');

const ResponseDto = require('../../../dto/ResponseDto');

const dreamRepository = require('../../repository/DreamRepository');
const config = require('../../../config/config.json').development;

module.exports = class DreamService {
  constructor(req) {
    this.query = req.query;
    this.params = req.params;
  }

  async findAllCategory() {
    const hangulMap = {
      ㄲ: 'ㄱ',
      ㄸ: 'ㄷ',
      ㅃ: 'ㅂ',
      ㅆ: 'ㅅ',
      ㅉ: 'ㅈ',
    };

    try {
      const noun = await dreamRepository.findAllNoun();
      const verbAndAdjective = await dreamRepository.findAllVerbAndAdjective();

      const consonants = [];
      const newVerbAndAdjective = [];

      verbAndAdjective.forEach((el) => {
        let consonant = hangul.disassemble(el.name)[0];

        if (hangulMap[consonant]) {
          consonant = hangulMap[consonant];
        }

        const idx = consonants.indexOf(consonant);

        if (idx === -1) {
          newVerbAndAdjective.push({
            name: consonant,
            categories: [
              {
                id: String(el.id),
                parentsKeyword: consonant,
                name: el.name,
                image: config.dreamImage + el.image,
              },
            ],
          });
          consonants.push(consonant);
        } else {
          newVerbAndAdjective[idx].categories.push({
            id: String(el.id),
            parentsKeyword: consonant,
            name: el.name,
            image: config.dreamImage + el.image,
          });
        }
      });

      return {
        noun: noun.map((el) => {
          return {
            id: String(el.id),
            name: el.name,
            image: config.categoryIcon + el.dataValues.bigImage,
            categories: el.categories.map((category) => {
              return {
                id: String(category.id),
                parentsKeyword: el.name,
                name: category.name,
                image: config.dreamImage + category.dataValues.smallImage,
              };
            }),
          };
        }),
        verbAndAdjective: newVerbAndAdjective,
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
      const newDream = dream.map((el) => {
        return {
          id: String(el.id),
          title: el.title,
          image: [config.dreamImage + el.image],
        };
      });

      await dreamRepository.updateOnlyHitByKeword(mainKeword, subKeword);

      if (!subKeword) {
        return new ResponseDto(200, '필터 결과 조회', { newDream });
      }

      return new ResponseDto(200, '필터 결과 조회', {
        dream: newDream.filter((el) => {
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
    let dream;

    try {
      const categoryId = await dreamRepository.findOneCategoryByKeword(keword);

      if (!categoryId) {
        dream = await dreamRepository.findAllCategorySearchByKeword(keword);

        if (!dream.length) {
          return new ResponseDto(202, '검색 결과가 존재하지 않습니다.');
        }
      } else {
        dream = await dreamRepository.findAllCategoryByKeword(categoryId);
      }

      dream.forEach((_, idx) => (dream[idx].id = String(dream[idx].id)));

      await dreamRepository.updateOnlyHitByKeword(keword);

      // return new ResponseDto(200, '', { dream });
      return new ResponseDto(200, '검색 결과 조회', {
        dream: dream.map((el) => {
          return {
            id: el.id,
            title: el.title,
            image: el.image
              .split(',')
              .slice(0, 2)
              .map((e) => config.dreamImage + e),
          };
        }),
      });
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

  async getDreamSearchResult() {
    try {
      if (!this.query.word && !this.query.categories) {
        return new ResponseDto(400, '검색어 또는 카테고리를 선택해주세요');
      }

      const categories = this.query.categories.split(',');
      let word = this.query.word;

      const wordToCategory = await dreamRepository.getDreamCategoryId([word]);

      const categoryId = await dreamRepository.getDreamCategoryId(categories);

      if (wordToCategory.length) {
        categoryId.push(wordToCategory[0]);
        word = '';
      }

      if (!categoryId.length && this.query.categories) {
        return new ResponseDto(400, '존재하지 않는 카테고리입니다.');
      }

      const dream = await dreamRepository.getDreamSearchResult(
        word,
        categoryId
      );

      return new ResponseDto(200, '꿈 검색 결과 조회', {
        dream,
      });
    } catch (err) {
      throw err;
    }
  }

  async getDreamSearchCount() {
    try {
      if (!this.query.word && !this.query.categories) {
        return new ResponseDto(400, '검색어 또는 카테고리를 선택해주세요');
      }

      const categories = this.query.categories.split(',');
      let word = this.query.word;

      const wordToCategory = await dreamRepository.getDreamCategoryId([word]);

      const categoryId = await dreamRepository.getDreamCategoryId(categories);

      if (wordToCategory.length) {
        categoryId.push(wordToCategory[0]);
        word = '';
      }

      if (!categoryId.length && this.query.categories) {
        return new ResponseDto(400, '존재하지 않는 카테고리입니다.');
      }

      const dream = await dreamRepository.getDreamSearchResult(
        word,
        categoryId
      );

      return new ResponseDto(200, '꿈 검색 결과 조회', {
        count: dream.length,
      });
    } catch (err) {
      throw err;
    }
  }
};
