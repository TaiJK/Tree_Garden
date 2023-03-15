const express = require('express');
const router = express.Router();
const plantsController = require('../controllers/PlantController');
const verify = require ('/Nodejs_dataGreen/middleware/auth')


//newController.index()
//router.use('/:details',plantsController.index)



router.get('/',plantsController.getPlants);
router.get('/:number',plantsController.getPlant_Number);
router.put('/:id',plantsController.putPlant_update);
router.post('/post',plantsController.postPlant);
router.delete('/:id',plantsController.deletePlant);

router.get('/',plantsController.index)
module.exports = router;    