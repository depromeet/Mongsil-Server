const UserService = require('../models/service/UserService');

module.exports = {
  findAllUser: async function(req, res){
    res.send(await UserService.allUser()); 
  }
}