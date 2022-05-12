const dreamService = require("../models/service/dream/DreamService");
const validation = require("../libs/validations");
const ResponseDto = require("../dto/ResponseDto");
module.exports = {
  findAllCategory: async function (req, res) {
    const categoryInfo = await dreamService.findAllCategory();
    res.status(200).send(new ResponseDto(200, "success", categoryInfo));
  },
};
