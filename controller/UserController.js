const UserService = require('../models/service/UserService');
module.exports = {
  findAllUser: async function(req, res){
    res.send(await UserService.allUser()); 
  },
  saveUser: async function(req, res){
    try{
      let userId = await UserService.saveUser(req.body)
      res.status(200).json({"userId":userId});
    }catch(err){
      console.log("ff")
      console.log(err);
      res.status(500).send(err);
    }
  }
}