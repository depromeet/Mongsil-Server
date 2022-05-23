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
      const email = '23265@naver.com';
      const transaction = await sequelize.transaction();
      const userId = await userService.saveUser(name, email, transaction);
      await transaction.rollback();
      userId.should.be.a.Number();
    });
    describe('fail save user', () => {
      it('중복 이메일 에러 반환', async () => {
        const transaction = await sequelize.transaction();
        const name = 'test';
        const email = 'test@naver.com';
        assert.rejects(async function () {
          await userService.saveUser(name, email, transaction);
        }, '이메일이 중복되었습니다.');
      });
    });
  });
});

describe('POST 유저 회원 탈퇴', () => {
  describe('success user expire', () => {
    it('user 삭제', async () => {
      const transaction = await sequelize.transaction();
      const name = 'test';
      const email = '11112@naver.com';
      const userId = await userService.saveUser(name, email, transaction);
      await transaction.commit();
      await userService.deleteUser(userId);
    });
  });
});

describe('POST 유저 가입 조회', () => {
  describe('success', () => {
    it('유저 Id 조회', async () => {
      const userInfo = await userService.findUser('test@naver.com');
      userInfo.dataValues.email.should.equal('test@naver.com');
    });
  });
});
