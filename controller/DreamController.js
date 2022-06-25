'use strict';

const ResponseDto = require('../dto/ResponseDto');
const DreamServiceError = require('../models/service/dream/Error');

const DreamService = require('../models/service/dream/DreamService');

module.exports = {
  findAllCategory: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

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

  countDreamFilter: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.countDreamFilter();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  findAllDreamFilter: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.findAllDreamFilter();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  findAllDreamSearch: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.findAllDreamSearch();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  findPopularityKeword: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.findPopularityKeword();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  findOneDreamById: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.findOneDreamById();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  getDreamSearchResult: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.getDreamSearchResult();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },

  getDreamSearchCount: async (req, res) => {
    try {
      const dreamService = new DreamService(req);

      const response = await dreamService.getDreamSearchCount();

      res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(err);

      res.status(500).json(new DreamServiceError(err.message));
    }
  },
};
