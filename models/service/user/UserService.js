const userRepository = require('../../repository/UserRepository');
const userDreamRepository = require('../../repository/UserDreamRepository');
const { sequelize, User } = require('../../index');
const UserServiceError = require('../../Error');
module.exports = {
  allUser: async function () {
    return await userRepository.findAll();
  },
  saveUser: async function (userName, userEmail) {
    const transaction = await sequelize.transaction();
    try {
      if (await userRepository.findByEmail(userEmail, transaction)) {
        await transaction.rollback();
        throw new Error('이메일이 중복되었습니다.');
      } else {
        const userInfo = await userRepository.save(
          userName,
          userEmail,
          transaction
        );
        await transaction.commit();
        return userInfo;
      }
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
  deleteUser: async function (userId) {
    const transaction = await sequelize.transaction();
    try {
      await userRepository.deleteById(userId, transaction);
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
  findUser: async function (userEmail) {
    const transaction = await sequelize.transaction();
    try {
      const user = await userRepository.findByEmail(userEmail, transaction);
      await transaction.commit();
      return user;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
  saveDream: async function (userId, dreamId) {
    const transaction = await sequelize.transaction();
    try {
      const saveDreamInfo = await userDreamRepository.findByUserIdAndDreamId(
        userId,
        dreamId,
        transaction
      );
      if (saveDreamInfo.length !== 0) {
        await transaction.rollback();
        throw new UserServiceError('이미 저장된 해몽 카드입니다.');
      }
      await userDreamRepository.save(userId, dreamId, transaction);
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
  getAllSaveDream: async function (userId, date) {
    const transaction = await sequelize.transaction();
    try {
      return await userDreamRepository.findByUserId(userId, transaction);
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
  deleteUserDream: async function (idList) {
    const transaction = await sequelize.transaction();
    try {
      for (let id of idList) {
        await userDreamRepository.deleteByid(id, transaction);
      }
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
};
