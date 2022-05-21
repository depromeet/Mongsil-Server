const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./domain/User');
const UserDream = require('./domain/UserDream');
const Dream = require('./domain/Dream');
const DreamCard = require('./domain/DreamCard');
const DreamCardCategory = require('./domain/DreamCardCategory');
const Category = require('./domain/Category');
const DreamCategory = require('./domain/DreamCategory');
const BigCategory = require('./domain/BigCategory');
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.UserDream = UserDream;
db.Dream = Dream;
db.DreamCard = DreamCard;
db.DreamCardCategory = DreamCardCategory;
db.BigCategory = BigCategory;
db.Category = Category;
db.DreamCategory = DreamCategory;

User.init(sequelize);
UserDream.init(sequelize);
Dream.init(sequelize);
DreamCard.init(sequelize);
DreamCardCategory.init(sequelize);
Category.init(sequelize);
DreamCategory.init(sequelize);
BigCategory.init(sequelize);

User.associate(db);
UserDream.associate(db);
Dream.associate(db);
DreamCard.associate(db);
DreamCardCategory.associate(db);
Category.associate(db);
DreamCategory.associate(db);
BigCategory.associate(db);
module.exports = db;
