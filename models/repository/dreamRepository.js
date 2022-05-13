'use strict';

const Sequelize = require('../index');
const { Op } = require('sequelize');

module.exports = {
  findAllCategory: async () => {
    try {
      const noun = await Sequelize.BigCategory.findAll({
        attributes: ['name'],
        where: {
          name: {
            [Op.ne]: '동사/형용사',
          },
        },
        include: [
          {
            model: Sequelize.Category,
            attributes: ['name'],
          },
        ],
      });
      const verbAndAdjective = await Sequelize.Category.findAll({
        attributes: ['name'],
        where: {
          bigCategoryId: 4,
        },
      });

      return { noun, verbAndAdjective };
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
        SELECT dream.id, title, description FROM dream
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
