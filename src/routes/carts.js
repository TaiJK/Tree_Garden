const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');



// router.post('/addcart/:id')

router.post('/addcart/:id',cartController.addCart);
router.get('/',cartController.presentCart);





module.exports = router;  