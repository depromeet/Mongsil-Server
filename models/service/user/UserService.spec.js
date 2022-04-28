const userService = require('./UserService');
const userRepository = require('../../repository/UserRepository');
const { sequelize, User } = require('../../index');
const UserServiceError = require('../../Error');
const should = require('should');
const assert = require('assert');

describe('POST 유저 정보 저장', () => {
  describe('success save user', () => {
    it('유저 아이디 반환', async () => {
      const name = 'test';
      const email = 'test13573@naver.com';
      const transaction = await sequelize.transaction();
      const userId = await userService.saveUser(name, email);
      const findUser = await userRepository.findByEmail(email, transaction);
      await transaction.rollback();
      userId.should.equal(findUser.id);
    });
  });
  describe('fail save user', () => {
    it.only('중복 이메일 에러 반환', async () => {
      const name = 'test';
      const email = 'test@naver.com';
      assert.rejects(async function () {
        await userService.saveUser(name, email);
      }, '이메일이 중복되었습니다.');
    });
  });
});
