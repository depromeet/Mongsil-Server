'use strict';

const ResponseDto = require('../dto/ResponseDto');
const DreamServiceError = require('../models/service/dream/Error');

const dreamService = require('../models/service/dream/dreamService');

module.exports = {
  findAllCategory: async (req, res) => {
    try {
      const { noun, verbAndAdjective } = await dreamService.findAllCategory();

      const response = new ResponseDto(200, '카테고리 필터 목록 조회', {
        noun,
        verbAndAdjective,
      });

      res.status(200).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },
};
