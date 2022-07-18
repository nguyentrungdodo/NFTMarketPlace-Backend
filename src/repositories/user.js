const db = require("../utils/database");
const user = db.user;
const createOne = (data) => {
  return user.create(data);
};
const findOneByCondition = (condition) => {
  return user.findOne({
    where: condition,
  });
};
const updateOneByCondition = (data, condition) => {
  return user.update(data, { where: condition });
};
const findOneByCheckWallet = (condition) => {
  return user.findOne({
    where: condition,
  });
};

const findAccount = (condition) => {
  return user.findOne({
    where: condition,
  });
};

module.exports = {
  createOne,
  findOneByCondition,
  updateOneByCondition,
  findOneByCheckWallet,
  findAccount
};
