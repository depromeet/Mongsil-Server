const Sequelize = require('sequelize');
const User = require('./domain/User')
const UserDream = require('./domain/UserDream')
const Dream = require('./domain/User')
const DreamCard = require('./domain/DreamCard')
const DreamCardCategory = require('./domain/DreamCardCategory')
const Category = require('./domain/Category')
const DreamCategory = require('./domain/DreamCategory')

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env]
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config)
db.sequelize = sequelize;

// // DB N:N 관계 정보
// db.User.hasmany(db.UserDream, {through: 'UserDream'});

db.User = User;
db.UserDream = UserDream;
db.Dream = Dream;
db.DreamCard = DreamCard;
db.DreamCardCategory = DreamCardCategory;
db.Category = Category;
db.DreamCategory = DreamCategory;

User.init(sequelize);
UserDream.init(sequelize);
Dream.init(sequelize);
DreamCard.init(sequelize);
DreamCardCategory.init(sequelize);
Category.init(sequelize);
DreamCategory.init(sequelize);

User.associate(db);
UserDream.associate(db);
Dream.associate(db);
DreamCard.associate(db);
DreamCardCategory.associate(db);
Category.associate(db);
DreamCategory.associate(db);

module.exports = db;
