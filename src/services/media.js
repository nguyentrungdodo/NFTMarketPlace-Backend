const mediaRepo = require("../repositories/media");

const findOneById = async (id) => {
  return await mediaRepo.findOneById(id);
};

const findOneByCondition = async (condition) => {
  return await mediaRepo.findOneByCondition(condition);
};

const findAll = async () => {
  let formList = await mediaRepo.findAll();
  return formList;
};
const findAllByUserId = async (userId) => {
  let formList = await mediaRepo.findAllByUserId(userId);
  return formList;
};
const createOne = async (media) => {
  return await mediaRepo.createOne(media);
};

const updateOne = async (id, formData) => {
  return await mediaRepo.updateOne(id, formData);
};

const deleteOne = async (id) => {
  return await mediaRepo.deleteOne(id);
};

const save = async (formId, media) => {
  const condition = {
    form_id: formId,
  };
  const formMedia = await mediaRepo.findOneByCondition(condition, media);
  if (!formMedia) {
    return mediaRepo.createOne({
      form_id: formId,
      data: JSON.stringify(media),
    });
  } else {
    return mediaRepo.updateOneByCondition(
      {
        data: JSON.stringify(media),
      },
      condition
    );
  }
};

const updateOneByCondition = (formId, data) => {
  const condition = {
    form_id: formId,
  };
  return mediaRepo.updateOneByCondition(data, condition);
};

module.exports = {
  findOneById,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  findOneByCondition,
  save,
  updateOneByCondition,
  findAllByUserId,
};
