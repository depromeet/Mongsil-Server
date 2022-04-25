const fs = require('fs');
const Sequelize = require('../models/index');
let fileName = '행사';
fs.readFile(`./libs/${fileName}.json`, async function (err, result) {
  if (err) {
    console.log(err);
  } else {
    try {
      let category = await Sequelize.Category.create({
        name: fileName,
        bigCategoryId: 15,
        image: 'sample',
      });
      const dreamInfo = JSON.parse(result);
      for (let i = 0; i < dreamInfo.length; i++) {
        let title = dreamInfo[i].dream;
        let description = dreamInfo[i].translate;
        let categoryId = category.id;
        try {
          let dream = await Sequelize.Dream.create({
            title: title,
            description: description,
          });
          await Sequelize.DreamCategory.create({
            dreamId: dream.id,
            categoryId: categoryId,
          });
        } catch (err) {
          if ((err.code = 'ER_DUP_ENTRY')) {
            const temp = await Sequelize.Dream.findOne({
              where: {
                title: title,
              },
            });
            await Sequelize.DreamCategory.create({
              dreamId: temp.id,
              categoryId: categoryId,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
