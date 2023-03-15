const express = require('express');
const router = express.Router();
const midController = require('../controllers/MidController');

router.get('/show/:id',midController.show);



module.exports = router;  

