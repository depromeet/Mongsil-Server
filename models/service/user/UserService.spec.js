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
    describe('fail save user', () => {
      it('중복 이메일 에러 반환', async () => {
        const name = 'test';
        const email = 'test@naver.com';
        assert.rejects(async function () {
          await userService.saveUser(name, email);
        }, '이메일이 중복되었습니다.');
      });
    });
  });
});

describe('POST 유저 회원 탈퇴', () => {
  describe('success user expire', () => {
    it.only('status 값 변경', async () => {});
  });
});

describe('POST 유저 가입 조회', () => {
  describe('success', () => {
    it.only('유저 Id 조회', async () => {
      const userInfo = await userService.findUser('test@naver.com');
    });
  });
});
