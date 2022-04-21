const UserRepository = require('../repository/UserRepository');
const validation = require('../../libs/validations');
const {sequelize} = require('../index')
const UserServiceError = require('../Error');
module.exports = {
  allUser: async function(){
    return await UserRepository.findAll();
  },
  saveUser: async function(body){
    const transaction = await sequelize.transaction()
    try{
      const {userName, userEmail} = body; 
      const validationValue = validation.userSaveValidation(body);
      
      if(validationValue){
        throw new Error(validationValue);
      }else if(UserRepository.findByEmail(userEmail, transaction)){
        console.log("Adf")
        throw new Error("이메일이 중복되었습니다.");
      }else{
        const userInfo = await UserRepository.save(userName, userEmail, transaction);
        await transaction.commit();
        return userInfo.id;
      }
    }catch(err){
      console.log(err);
      await transaction.rollback();
      throw new UserServiceError(err.message);
    } 
  }
} 