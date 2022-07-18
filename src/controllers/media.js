const mediaService = require("../services/media");
const mediaRepo = require("../repositories/media");
const create = async (req, res) => {
  const form = { ...req.body, user_id: req.payload.user_id };
  try {
    const result = await mediaService.createOne(form);
    const tokenUrI = `http://localhost:3000/media/${result.id}`;
    return res.status(200).send(tokenUrI);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await mediaService.findAll();
    if (!result) {
      return res.status(204).send();
    }
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    console.log("id");
    const id = req.params.id;
    const form = await mediaService.findOneById(id);
    if (!form) {
      return res.status(204).send();
    }
    return res.status(200).send(form);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await mediaService.updateOne(id, data);
    if (!result) {
      return res.status(400).send();
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await mediaService.deleteOne(id);
    if (!result) {
      return res.status(400).send();
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const save = async (req, res) => {
  try {
    const { formId, media } = req.body;
    if (!formId) {
      return res.status(400).send({ message: "Bad request" });
    }
    const saveMedia = await mediaService.save(formId, media);
    if (saveMedia) {
      return res.status(200).send({ message: "Save successfully" });
    }
    return res.status(400).send({ message: "Bad request" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const fetchMedia = async (req, res) => {
  try {
    const media = await mediaService.findAll();
    if (!media) {
      return res.status(204).send();
    }
    return res.status(200).send(media);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateMediaByFormId = async (req, res) => {
  try {
    const formId = req.params.formId;
    const data = req.body;
    const result = await mediaService.updateOneByCondition(formId, data);
    if (!result) {
      return res.status(400).send();
    }
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getMediaByImage = async (req, res) => {
  try {
    const imageLink = req.body.image;
    const result = await mediaRepo.findByImage(imageLink);
    if (!result) {
      return res.status(400).send();
    }
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  save,
  fetchMedia,
  updateMediaByFormId,
  getMediaByImage,
};
