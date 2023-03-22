const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const verify = require('../middleware/auth')


// router.post('/addcart/:id')

router.put('/addcart',verify,cartController.addcart);
router.delete('/delete',verify,cartController.deleteItemCart);
router.put('/update',verify,cartController.updateCart);
router.get('/',verify,cartController.presentCart);





module.exports = router;  