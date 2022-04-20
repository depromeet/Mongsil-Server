const Sequelize = require('../index')
module.exports = {
  findAll: async function(){
    return await Sequelize.User.findAll()
  },
}