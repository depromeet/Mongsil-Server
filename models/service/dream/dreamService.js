'use strict';

const dreamRepository = require('../../repository/dreamRepository');
const { sequelize } = require('../../index');

module.exports = {
  findAllcategory: async () => {
    try {
      const category = await dreamRepository.findAllcategory();
      const noun = category.noun.map((el) => el.name);
      const verbAndAdjective = category.verbAndAdjective.map((el) => el.name);

      return { noun, verbAndAdjective };
    } catch (err) {
      return err;
    }
  },
};
