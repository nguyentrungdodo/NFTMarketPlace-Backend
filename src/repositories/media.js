const db = require("../utils/database");
const media = db.media;

const findOneById = (id) => {
  return media.findOne({
    where: {
      id: id,
    },
  });
};

const findOneByCondition = (condition) => {
  return media.findOne({
    where: condition,
  });
};

const findAll = () => {
  return media.findAll({
    order: [["created_at", "DESC"]],
    include: { model: db.user },
  });
};

const createOne = (data) => {
  return media.create(data);
};

const updateOne = (id, data) => {
  return media.update(data, { where: { id: id } });
};

const updateOneByCondition = (data, condition) => {
  return media.update(data, { where: condition });
};

const deleteOne = (id) => {
  return media.destroy({
    where: {
      id: id,
    },
  });
};
const findAllByUserId = (id) => {
  return media.findAll({
    where: {
      user_id: id,
    },
  });
};
const findByImage = (image) => {
  return media.findOne({
    where: {
      image: image,
    },
    include:{
      model:db.user
    }
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
  findAllByUserId,
  findByImage,
};
