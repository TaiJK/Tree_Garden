const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


router.post('/register',userController.user_register);
router.post('/login',userController.login);
router.get('/all',userController.getUser);
router.get('/',userController.index);
module.exports = router;