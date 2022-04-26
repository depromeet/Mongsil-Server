const fs = require('fs');
const Sequelize = require('../models/index');
const folderName = '형용사';
fs.readdir(`./libs/${folderName}`, async (err, file) => {
  if (err) {
    console.log('b', err);
  } else {
    for (let i = 0; i < file.length; i++) {
      let fileName = file[i].replace('.json', '');
      await fs.readFile(`./libs/${folderName}/${fileName}.json`, async function (err, result) {
        if (err) {
          console.log('a', err);
        } else {
          try {
            let dreamInfo = await JSON.parse(result);
            let category = await Sequelize.Category.create({
              name: fileName,
              bigCategoryId: 15,
              image: 'sample',
            });
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
                  let temp = await Sequelize.Dream.findOne({
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
    }
  }
});
