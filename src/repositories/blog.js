const db = require("../utils/database");
const blog = db.blog;

const findOneById = (id) => {
  return blog.findOne({
    where: {
      id: id,
    },
  });
};

const findOneByCondition = (condition) => {
  return blog.findOne({
    where: condition,
  });
};

const findAll = () => {
  return blog.findAll({
    order: [["created_at", "DESC"]],
    include:{model:db.user}
  });
};

const createOne = (data) => {
  return blog.create(data);
};

const updateOne = (id, data) => {
    console.log('data',data);
  return blog.update(data, { where: { id: id } });
};

const updateOneByCondition = (data, condition) => {
  return blog.update(data, { where: condition });
};

const deleteOne = (id) => {
  return blog.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  findOneById,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  findOneByCondition,
  updateOneByCondition,
};
