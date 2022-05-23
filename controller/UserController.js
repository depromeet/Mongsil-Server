const userService = require('../models/service/user/UserService');
const validation = require('../libs/validations');
const ResponseDto = require('../dto/ResponseDto');
const CheckUserDto = require('../dto/user/CheckUserDto');
const UserServiceError = require('../models/Error');
const SaveDreamDto = require('../dto/user/SaveDreamDto');
const { sequelize, User } = require('../models/index');
module.exports = {
  findAllUser: async function (req, res) {
    res.send(await userService.allUser());
  },
  saveUser: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const validationValue = validation.userSaveValidation(req.body);
      if (validationValue) {
        throw new Error(validationValue);
      } else {
        let userId = await userService.saveUser(
          req.body.userName,
          req.body.userEmail,
          transaction
        );
        await transaction.commit();
        res.status(200).send(
          new ResponseDto(200, '회원가입이 완료되었습니다.', {
            userId: userId,
          })
        );
      }
    } catch (err) {
      console.log(err);
      await transaction?.rollback();
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  deleteUser: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await userService.deleteUser(req.body.userId, transaction);
      await transaction.commit();
      res.status(200).send(new ResponseDto(200, '탈퇴가 완료되었습니다.'));
    } catch (err) {
      await transaction?.rollback();
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  checkUser: async function (req, res) {
    try {
      const user = await userService.findUser(req.body.userEmail);
      res
        .status(200)
        .send(
          new ResponseDto(200, '회원 존재 유무 결과', new CheckUserDto(user))
        );
    } catch (err) {
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  saveDream: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await userService.saveDream(
        req.body.userId,
        req.body.dreamId,
        transaction
      );
      await transaction.commit();
      res.status(200).send(new ResponseDto(200, '해몽 카드 저장 완료'));
    } catch (err) {
      await transaction?.rollback();
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  getSaveDreamList: async function (req, res) {
    try {
      const dreamInfo = await userService.getAllSaveDream(req.body.userId);
      res
        .status(200)
        .send(new ResponseDto(200, 'success', new SaveDreamDto(dreamInfo)));
    } catch (err) {
      console.log(err);
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  deleteUserDream: async function (req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      await userService.deleteUserDream(req.body.dreamIdList, transaction);
      await transaction.commit();
      res.status(200).send(new ResponseDto(200, '해몽 카드 삭제 완료'));
    } catch (err) {
      console.log(err);
      await transaction?.rollback();
      res.status(500).send(new UserServiceError(err.message));
    }
  },
};
