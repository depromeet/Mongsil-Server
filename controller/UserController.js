const userService = require('../models/service/user/UserService');
const validation = require('../libs/validations');
const ResponseDto = require('../dto/ResponseDto');
const CheckUserDto = require('../dto/user/CheckUserDto');
const UserServiceError = require('../models/Error');
module.exports = {
  findAllUser: async function (req, res) {
    res.send(await userService.allUser());
  },
  saveUser: async function (req, res) {
    try {
      const validationValue = validation.userSaveValidation(req.body);
      if (validationValue) {
        throw new Error(validationValue);
      } else {
        let userId = await userService.saveUser(req.body.userName, req.body.userEmail);
        res
          .status(200)
          .json(new ResponseDto(200, '회원가입이 완료되었습니다.', { userId: userId }));
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  deleteUser: async function (req, res) {
    try {
      await userService.deleteUser(req.body.userId);
      res.status(200).json(new ResponseDto(200, '탈퇴가 완료되었습니다.'));
    } catch (err) {
      res.status(500).send(new UserServiceError(err.message));
    }
  },
  checkUser: async function (req, res) {
    try {
      const user = await userService.findUser(req.body.userEmail);
      res.status(200).json(new ResponseDto(200, '회원 존재 유무 결과', new CheckUserDto(user)));
    } catch (err) {
      res.status(500).send(new UserServiceError(err.message));
    }
  },
};
