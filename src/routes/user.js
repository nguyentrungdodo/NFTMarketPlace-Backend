const router = require('express').Router();
const userCtrl = require('../controllers/user');
const authen = require('../middlewares/authen');
router.post('/', userCtrl.create); 
router.post('/save', userCtrl.save); 
router.post('/wallet', userCtrl.checkWallet); 
router.post('/signin', userCtrl.signIn);
router.post('/signup',userCtrl.signup)
router.get('/me',authen.authenticationToken,userCtrl.getMe);
module.exports = router;
// authen // author // admin.create