const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const verify = require ('../middleware/auth');

router.get('/load',userController.index);
router.post('/register',userController.user_register);
router.post('/login',userController.login);
router.get('/all',verify,userController.getUser);
router.put('/:id',verify,userController.putUser_update);
router.delete('/:id',verify,userController.deleteUSer);
router.get('/',userController.index);
module.exports = router;