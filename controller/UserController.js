const UserService = require('../models/service/user/UserService');
const validation = require('../libs/validations');
const UserServiceError = require('../models/Error');
module.exports = {
  findAllUser: async function (req, res) {
    res.send(await UserService.allUser());
  },
  saveUser: async function (req, res) {
    try {
      const validationValue = validation.userSaveValidation(req.body);
      if (validationValue) {
        throw new Error(validationValue);
      } else {
        let userId = await UserService.saveUser(
          req.body.userName,
          req.body.userEmail
        );
        res.status(200).json({ userId: userId });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(new UserServiceError(err.message));
    }
  },
};
