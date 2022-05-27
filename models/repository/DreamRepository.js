'use strict';

const Sequelize = require('../index');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
  findAllNoun: async () => {
    try {
      const noun = await Sequelize.BigCategory.findAll({
        attributes: ['name', ['image', 'bigImage']],
        where: {
          name: {
            [Op.ne]: '동사/형용사',
          },
        },
        include: [
          {
            model: Sequelize.Category,
            attributes: ['name', ['image', 'smallImage']],
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
        attributes: ['name', 'image'],
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
        SELECT dream.id, title FROM dream
        INNER JOIN dream_category
        ON category_id = ${categoryId}
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
        attributes: ['name'],
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
      const dream = await Sequelize.Dream.findOne({
        where: { id },
      });

      return dream;
    } catch (err) {
      throw err;
    }
  },

  findAllCategorySearchByKeword: async (keword) => {
    try {
      const query =
        'select id, title from dream where replace(title," ","") like :searchText or replace(title," ","") like :searchText ORDER BY id ASC';

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
};
