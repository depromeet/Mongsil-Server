'use strict';

const dreamRepository = require('../../repository/dreamRepository');
const { sequelize } = require('../../index');

module.exports = {
  findAllCategory: async () => {
    try {
      const category = await dreamRepository.findAllCategory();
      const noun = category.noun.map((el) => el.name);
      const verbAndAdjective = category.verbAndAdjective.map((el) => el.name);

      return { noun, verbAndAdjective };
    } catch (err) {
      throw err;
    }
  },
};
