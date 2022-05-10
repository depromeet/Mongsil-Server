'use strict';

const ResponseDto = require('../dto/ResponseDto');

const dreamService = require('../models/service/dream/dreamService');

module.exports = {
  findAllcategory: async (req, res) => {
    const { noun, verbAndAdjective } = await dreamService.findAllcategory();

    const response = new ResponseDto(200, '카테고리 필터 목록 조회', {
      noun,
      verbAndAdjective,
    });

    res.status(200).json(response);
  },
};
