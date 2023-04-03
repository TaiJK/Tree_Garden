const express = require('express');
const router = express.Router();
const kindsController = require('../controllers/KindController');
const verify = require ('../middleware/auth.js')

router.post('/post',verify,kindsController.postKind);
router.put('/:id',verify,kindsController.putKind);
router.delete('/:id',verify,kindsController.deleteKind);
router.get('/:id',verify,kindsController.getKindsbyid);
router.post('/sort',kindsController.postSortKindtoPlant);
router.get ('/',verify,kindsController.getKinds);

module.exports = router;  



