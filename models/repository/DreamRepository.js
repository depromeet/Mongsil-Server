'use strict';

const Sequelize = require('../index');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const config = require('../../config/config.json').development;

module.exports = {
  findAllNoun: async () => {
    try {
      const noun = await Sequelize.BigCategory.findAll({
        attributes: ['id', 'name', ['image', 'bigImage']],
        where: {
          name: {
            [Op.ne]: '동사/형용사',
          },
        },
        order: [['name', 'asc']],
        include: [
          {
            model: Sequelize.Category,
            attributes: ['id', 'name', ['image', 'smallImage']],
            where: {
              id: {
                [Op.ne]: 232,
              },
            },
          },
        ],
        type: QueryTypes.SELECT,
      });

      let idx;

      noun.forEach((el, i) => {
        if (el.name === '기타') idx = i;
      });

      noun.push(...noun.splice(idx, 1));
      return noun;
    } catch (err) {
      throw err;
    }
  },

  findAllVerbAndAdjective: async () => {
    try {
      const verbAndAdjective = await Sequelize.Category.findAll({
        attributes: ['id', 'name', 'image'],
        where: {
          bigCategoryId: 4,
        },
      });

      return verbAndAdjective;
    } catch (err) {
      throw err;
    }
  },

  findOneCategoryByKeword: async (keyword) => {
    try {
      const kewordId = await Sequelize.Category.findAll({
        attributes: ['id'],
        where: {
          name: keyword,
        },
      });

      return kewordId[0]?.id;
    } catch (err) {
      throw err;
    }
  },

  findAllCategoryByKeword: async (categoryId) => {
    try {
      const dream = await Sequelize.sequelize.query(`
        SELECT dream.id, title, category.image FROM dream
        LEFT JOIN dream_category
        ON category_id = ${categoryId}
        LEFT JOIN category
        ON category.id = dream_category.category_id
        WHERE dream.id = dream_category.dream_id
        ORDER BY dream.id ASC;
        `);

      return dream[0];
    } catch (err) {
      throw err;
    }
  },

  findPopularityKeword: async () => {
    try {
      const categories = await Sequelize.Category.findAll({
        attributes: ['id', 'name'],
        limit: 8,
        order: [['hit', 'DESC']],
      });

      return categories;
    } catch (err) {
      throw err;
    }
  },

  findOneDreamById: async (id) => {
    try {
      const query = `select dream.id as id, dream.title as title, dream.description as description, group_concat(concat_ws(':', category.id, big_category.name, category.name, category.image) separator '|') as categories, group_concat(category.image) as image from dream
      left join dream_category
      on dream_category.dream_id = dream.id
      left join category
      on category.id = dream_category.category_id
      left join big_category
      on big_category.id = category.big_category_id
      where dream.id = ${id}
      `;

      const [dream] = await Sequelize.sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true,
      });

      const keywords = [];

      const categories = dream.categories.split('|').map((el) => {
        const e = el.split(':');

        keywords.push(e[0]);

        return {
          id: e[0],
          parentsKeyword: e[1],
          name: e[2],
          image: config.dreamImage + e[3],
        };
      });

      await Sequelize.Category.increment(
        { hit: 1 },
        {
          where: {
            id: {
              [Op.or]: keywords,
            },
          },
        }
      );

      return {
        id: String(dream.id),
        title: dream.title,
        description: dream.description,
        categories,
        image: categories.map((category) => category.image).slice(0, 2),
      };
    } catch (err) {
      throw err;
    }
  },

  findAllCategorySearchByKeword: async (keword) => {
    try {
      const query = `select dream.id, dream.title, group_concat(category.image) as image, group_concat(category.name) name from dream
        left join dream_category
        on dream_category.dream_id = dream.id
        left join category
        on category.id = dream_category.category_id AND category.name != '기타'
        where replace(title," ","")
        like :searchText or replace(title," ","")
        like :searchText
        group by dream.id
        ORDER BY id ASC`;

      const dream = await Sequelize.sequelize.query(query, {
        replacements: { searchText: `%${keword.replace(/ /gi, '%')}%` },
        type: QueryTypes.SELECT,
        raw: true,
      });

      return dream;
    } catch (err) {
      throw err;
    }
  },

  updateOnlyHitByKeword: async (mainKeword = '', subKeword = '') => {
    try {
      const isUpdate = await Sequelize.Category.increment(
        { hit: 1 },
        {
          where: {
            name: {
              [Op.or]: [mainKeword, subKeword],
            },
          },
        }
      );

      return isUpdate;
    } catch (err) {
      throw err;
    }
  },

  findAllDreamImage: async (dreamId) => {
    try {
      const query = `select category.image from category
      left join dream_category
      on dream_category.category_id = category.id
      where dream_category.dream_id = ${dreamId}`;

      const images = Sequelize.sequelize.query(query);

      return images;
    } catch (err) {
      throw err;
    }
  },

  getDreamCategoryId: async (categories) => {
    try {
      let categoryQuery = '';

      if (categories && categories.length) {
        categoryQuery = `where name in (:category) and id != 232`;
      }

      const query = `select id from category ${categoryQuery}`;

      const dream = await Sequelize.sequelize.query(query, {
        replacements: { category: categories },
        type: QueryTypes.SELECT,
        raw: true,
      });

      return dream.map((el) => el.id);
    } catch (err) {
      throw err;
    }
  },

  getDreamSearchResult: async (word, categories) => {
    let categoryWhereQuery = '';
    try {
      if (categories && categories.length) {
        categoryWhereQuery = `and dream_category.dream_id in (select dream_id from dream_category where category_id in (${categories.pop()}))`;
      }

      const query = `select dream.id, dream.title, group_concat(distinct category.image SEPARATOR '|') as image, group_concat(distinct category.name SEPARATOR '|') name, group_concat(distinct category.id SEPARATOR '|') category from dream
        left join dream_category
        on dream_category.dream_id = dream.id
        left join category
        on category.id = dream_category.category_id
        where (replace(title," ","")
        like :searchText or replace(title," ","")
        like :searchText)
        ${categoryWhereQuery}
        group by dream.id
        ORDER BY id ASC`;

      let dream = await Sequelize.sequelize.query(query, {
        replacements: {
          searchText: `%${word.replace(/ /gi, '%')}%`,
        },
        type: QueryTypes.SELECT,
        raw: true,
      });

      dream = dream.filter((el) => {
        const name = el.category.split('|');
        let cnt = 0;

        for (let i = 0; i < categories.length; i += 1) {
          if (name.includes(String(categories[i]))) cnt += 1;
        }

        return cnt === categories.length;
      });

      return dream.map((el) => {
        return {
          id: String(el.id),
          title: el.title,
          image: el.image
            .split('|')
            .slice(0, 2)
            .map((e) => config.dreamImage + e),
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
