const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const verify = require ('../middleware/auth.js')

router.put('/',verify,orderController.putOrder);
router.delete('/',verify,orderController.delete);
router.get('/',verify,orderController.getOrder);

module.exports = router;  

