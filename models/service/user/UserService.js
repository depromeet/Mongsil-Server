const userRepository = require('../../repository/UserRepository');
const userDreamRepository = require('../../repository/UserDreamRepository');
const { sequelize, User } = require('../../index');
const UserServiceError = require('./Error');
module.exports = {
  allUser: async function () {
    return await userRepository.findAll();
  },
  saveUser: async function (userName, userEmail, transaction) {
    try {
      if (await userRepository.findByEmail(userEmail)) {
        throw new Error('이메일이 중복되었습니다.');
      } else {
        const userInfo = await userRepository.save(
          userName,
          userEmail,
          transaction
        );
        return userInfo.dataValues.id;
      }
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
  deleteUser: async function (userId, transaction) {
    try {
      await userRepository.deleteById(userId, transaction);
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
  findUser: async function (userEmail) {
    try {
      const user = await userRepository.findByEmail(userEmail);
      return user;
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
  saveDream: async function (userId, dreamId, transaction) {
    try {
      const saveDreamInfo = await userDreamRepository.findByUserIdAndDreamId(
        userId,
        dreamId
      );
      if (saveDreamInfo.length !== 0) {
        throw new UserServiceError('이미 저장된 해몽 카드입니다.');
      }
      await userDreamRepository.save(userId, dreamId, transaction);
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
  getAllSaveDream: async function (userId) {
    try {
      return await userDreamRepository.findByUserId(userId);
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
  deleteUserDream: async function (idList, transaction) {
    try {
      for (let id of idList) {
        await userDreamRepository.deleteByid(id, transaction);
      }
    } catch (err) {
      console.log(err);
      throw new UserServiceError(err.message);
    }
  },
};
