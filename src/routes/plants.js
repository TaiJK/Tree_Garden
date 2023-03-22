const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/PlantController');
const verify = require ('../middleware/auth.js')


//newController.index()
//router.use('/:details',plantsController.index)




router.get('/:id',verify,plantsController.getPlant_Number);
router.put('/:id',verify,plantsController.putPlant_update);
router.post('/post',verify,plantsController.postPlant);
router.delete('/:id',verify,plantsController.deletePlant);

router.get('/',verify,plantsController.getPlants);
router.get('/',verify,plantsController.index)

module.exports = router;    