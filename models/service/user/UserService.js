const userRepository = require('../../repository/UserRepository');
const { sequelize } = require('../../index');
const UserServiceError = require('../../Error');
module.exports = {
  allUser: async function () {
    return await userRepository.findAll();
  },
  saveUser: async function (userName, userEmail) {
    const transaction = await sequelize.transaction();
    try {
      if (await userRepository.findByEmail(userEmail, transaction)) {
        throw new Error('이메일이 중복되었습니다.');
      } else {
        const userInfo = await userRepository.save(userName, userEmail, transaction);
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
      console.log(user);
      await transaction.commit();
      return user;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
};
