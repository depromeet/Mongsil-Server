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
        include: [
          {
            model: Sequelize.Category,
            attributes: ['id', 'name', ['image', 'smallImage']],
          },
        ],
      });

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
      const query = `select dream.id as id, dream.title as title, dream.description as description, group_concat(category.name) as categories, group_concat(category.image) as image from dream
      left join dream_category
      on dream_category.dream_id = dream.id
      left join category
      on category.id = dream_category.category_id
      where dream.id = ${id}
      `;

      const [dream] = await Sequelize.sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true,
      });

      return {
        id: String(dream.id),
        title: dream.title,
        description: dream.description,
        categories: dream.categories.split(','),
        image: dream.image.split(','),
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
        categoryQuery = `where name in (:category)`;
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
        categoryWhereQuery = `and dream_category.dream_id in (select dream_id from dream_category where category_id in (${categories}))`;
      }

      const query = `select dream.id, dream.title, group_concat(distinct category.image SEPARATOR '|') as image, group_concat(distinct category.name SEPARATOR '|') name from dream
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

      const dream = await Sequelize.sequelize.query(query, {
        replacements: {
          searchText: `%${word.replace(/ /gi, '%')}%`,
        },
        type: QueryTypes.SELECT,
        raw: true,
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
