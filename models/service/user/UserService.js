const UserRepository = require('../../repository/UserRepository');
const { sequelize } = require('../../index');
const UserServiceError = require('../../Error');
module.exports = {
  allUser: async function () {
    return await UserRepository.findAll();
  },
  saveUser: async function (userName, userEmail) {
    const transaction = await sequelize.transaction();
    try {
      if (await UserRepository.findByEmail(userEmail, transaction)) {
        throw new Error('이메일이 중복되었습니다.');
      } else {
        const userInfo = await UserRepository.save(
          userName,
          userEmail,
          transaction
        );
        await transaction.commit();
        return userInfo.id;
      }
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    }
  },
};
