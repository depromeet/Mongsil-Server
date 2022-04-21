module.exports = {
  userSaveValidation: function(body){
    if(!body.userName){
      return "이름을 입력해주세요."
    }else if(!body.userEmail){
      return "이메일을 입력해주세요."
    }
  },
}