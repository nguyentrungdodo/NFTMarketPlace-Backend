const domainService = require("../services/domain");

const create = async (req, res) => {
  try {
    const { domain, ipfs, form_id } = req.body;
    if (!domain) {
      res.statusMessage = "Domain is empty";
      res.status(400).send();
      return;
    }

    // if (!ipfs) {
    //   res.statusMessage = 'Ipfs is empty';
    //   res.status(400).send();
    //   return;
    // }

    if (!form_id) {
      res.statusMessage = "Template id is empty";
      res.status(400).send();
      return;
    }

    // Check domain is existed
    const isExisted = await domainService.findByName(domain);
    if (isExisted) {
      res.statusMessage = "Domain is ready existed";
      res.status(409).send();
      return;
    }

    const result = await domainService.createAndDeploy(domain, ipfs, form_id);
    res.json(result);
  } catch (error) {
    res.status(500).send();
  }
};

const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const isExisted = await domainService.findByName(data.domain);
    if (isExisted) {
      res.statusMessage = "Domain is ready existed";
      res.status(409).send();
      return;
    }
    await domainService.updateOne(id, data);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
};

const getOne = async (req, res) => {
  try {
    const domain = req.params.domain;
    const result = await domainService.getOne(domain);
    if (!result) return res.status(400).send();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  create,
  getOne,
  updateOne,
};
