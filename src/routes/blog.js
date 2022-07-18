const router = require("express").Router();
const blogCtrl = require("../controllers/blog");
const authen = require("../middlewares/authen");
router.post("/", authen.authenticationToken, blogCtrl.create);
router.get("/", blogCtrl.getAll);
router.get("/:id", blogCtrl.getOne);
router.put("/:id", blogCtrl.updateOne);
router.delete("/:id", blogCtrl.deleteOne);
// router.post('/save', blogCtrl.save);
// router.get('/form/:formId', blogCtrl.fetchMediaByFormId);
// router.put('/form/:formId', blogCtrl.updateMediaByFormId);

module.exports = router;
