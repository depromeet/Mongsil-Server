class CheckUserDto {
  checkValue;
  userId;
  constructor(user) {
    if (user) {
      this.checkValue = true;
      this.userId = String(user.dataValues.id);
    } else this.checkValue = false;
  }
}

module.exports = CheckUserDto;
