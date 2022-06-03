const dreamCardService = require('../models/service/dreamCard/DreamCardService');
const validation = require('../libs/validations');
const ResponseDto = require('../dto/ResponseDto');
const CheckUserDto = require('../dto/user/CheckUserDto');
const DreamCardServiceError = require('../models/service/dreamCard/Error');
const DreamCardDto = require('../dto/dreamCard/DreamCardDto');
const { sequelize, User } = require('../models/index');
module.exports = {
  saveDreamCard: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const userId = req.body.userId;
      const title = req.body.title;
      const description = req.body.description;
      const categories = req.body.categories;

      await dreamCardService.save(userId, title, description, categories);
      await transaction.commit();

      res.status(200).send(new ResponseDto(200, '저장 완료'));
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      res.status(403).send(new DreamCardServiceError(err.message));
    }
  },
  updateDreamCard: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const dreamCardId = req.body.dreamCardId;
      const title = req.body.title;
      const description = req.body.description;
      const categories = req.body.categories;

      await dreamCardService.update(
        dreamCardId,
        title,
        description,
        categories
      );
      await transaction.commit();

      res.status(200).send(new ResponseDto(200, '수정 완료'));
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      res.status(403).send(new DreamCardServiceError(err.message));
    }
  },
  deleteDreamCard: async function (req, res) {
    let transaction;
    try {
      const dreamCardId = req.body.dreamCardId;

      await dreamCardService.delete(dreamCardId, transaction);
      await transaction.commit();
      res.status(200).send(new ResponseDto(200, '삭제 완료'));
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      res.status(403).send(new DreamCardServiceError(err.message));
    }
  },
  getDreamCardList: async function (req, res) {
    try {
      const userId = req.body.userId;

      const dreamCardList = await dreamCardService.getDreamCardList(userId);
      res
        .status(200)
        .send(new ResponseDto(200, 'success', new DreamCardDto(dreamCardList)));
    } catch (err) {
      console.log(err);
      res.status(403).send(new DreamCardServiceError(err.message));
    }
  },
};
