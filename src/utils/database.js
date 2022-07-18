const dbConfig = require("../config/config_db");
const mediaModel = require("../models/media");
const userModel = require("../models/user");
const blogModel = require('../models/blog');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.media = mediaModel(sequelize, Sequelize);
db.user = userModel(sequelize, Sequelize);
db.blog = blogModel(sequelize,Sequelize);
db.user.hasMany(db.media, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

db.media.belongsTo(db.user, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

db.user.hasMany(db.blog, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

db.blog.belongsTo(db.user, {
  foreignKey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    name: "user_id",
  },
});

module.exports = db;
