const router = require('express').Router();
const templateController = require('../controllers/template');
router.post('/', templateController.create);
router.get('/', templateController.getAll);
router.get('/:id', templateController.getOne);
router.put('/:id', templateController.updateOne);
router.delete('/:id', templateController.deleteOne);
module.exports = router;
