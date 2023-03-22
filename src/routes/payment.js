const express = require('express');
const router = express.Router();
const payController = require('../controllers/PayController');


router.put('/:id',payController.getbill);



module.exports = router;  