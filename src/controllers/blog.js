const blogService = require("../services/blog");

const create = async (req, res) => {
  const form =  { ...req.body, user_id: req.payload.user_id };
  try {
    const result = await blogService.createOne(form);
    return res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await blogService.findAll();
    if (!result) {
      return res.status(200).send([]);
    }
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    console.log('id',req.params.id);
    const id = req.params.id;
    const form = await blogService.findOneById(id);
    if (!form) {
      return res.status(204).send();
    }
    return res.status(200).send(form);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

const updateOne = async(req,res) =>{
  try {
    console.log('id',req.params.id,req.body);
    const id = req.params.id;
    const blog = req.body;
    const form = await blogService.updateOne(id,blog);
    console.log(form);
    if (!form[0]) {
      console.log('444444');
      return res.status(500).send();
    }
    return res.status(200).send(form);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
}
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    await blogService.deleteOne(id);
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,updateOne
};
