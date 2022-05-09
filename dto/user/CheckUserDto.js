class CheckUserDto {
  checkValue;
  userId;
  constructor(user) {
    if (user) {
      this.checkValue = true;
      this.userId = dataValues.id;
    } else this.checkValue = false;
  }
}

module.exports = CheckUserDto;
