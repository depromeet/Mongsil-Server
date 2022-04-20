const UserRepository = require('../repository/UserRepository');

module.exports = {
  allUser: async function(){
    return await UserRepository.findAll();
  }
} 