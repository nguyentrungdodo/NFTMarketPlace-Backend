const blogRepo = require("../repositories/blog");

const findOneById = async (id) => {
  return await blogRepo.findOneById(id);
};

const findOneByCondition = async (condition) => {
  return await blogRepo.findOneByCondition(condition);
};

const findAll = async () => {
  let formList = await blogRepo.findAll();
  return formList;
};

const createOne = async (blog) => {
  return await blogRepo.createOne(blog);
};

const updateOne = async (id, formData) => {
  return await blogRepo.updateOne(id, formData);
};

const deleteOne = async (id) => {
  return await blogRepo.deleteOne(id);
};

const save = async (formId, blog) => {
  const condition = {
    form_id: formId,
  };
  const formBlog = await blogRepo.findOneByCondition(condition, blog);
  if (!formBlog) {
    return blogRepo.createOne({
      form_id: formId,
      data: JSON.stringify(blog),
    });
  } else {
    return blogRepo.updateOneByCondition(
      {
        data: JSON.stringify(blog),
      },
      condition
    );
  }
};

const updateOneByCondition = (formId, data) => {
  const condition = {
    form_id: formId,
  };
  return blogRepo.updateOneByCondition(data, condition);
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
};
