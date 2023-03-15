const express = require('express');
const router = express.Router();
const kindsController = require('../controllers/KindController');
    

router.post('/post',kindsController.postKind);
router.put('/:id',kindsController.putKind);
router.delete('/:id',kindsController.deleteKind);
router.get('/:id',kindsController.getKindsbyid);
router.get ('/',kindsController.getKinds);

module.exports = router;  



