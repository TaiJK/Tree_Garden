const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const verify = require('../middleware/auth');
const CartController = require('../controllers/CartController');


// router.post('/addcart/:id')

router.put('/addcart',verify,cartController.addcart);
router.delete('/deleteitem',verify,cartController.deleteItemCart);
router.delete('/deletecart',verify,CartController.deleteCart);
router.put('/update',verify,cartController.updateCart);
router.get('/',verify,cartController.presentCart);





module.exports = router;  