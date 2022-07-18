const router = require('express').Router();
const mediaCtrl = require('../controllers/media');
const authen = require('../middlewares/authen')
router.post('/',authen.authenticationToken, mediaCtrl.create);
router.get('/', mediaCtrl.getAll);
router.get('/:id', mediaCtrl.getOne);
router.put('/:id', mediaCtrl.updateOne);
router.delete('/:id', mediaCtrl.deleteOne);
router.post('/save', mediaCtrl.save);
// router.get('/form/:formId', mediaCtrl.fetchMediaByFormId);
router.put('/form/:formId', mediaCtrl.updateMediaByFormId);
router.post('/cloud',mediaCtrl.getMediaByImage)
module.exports = router;
