const Plant = require('../modules/plants')
const User = require ('../modules/users')

class MidController{
    async show(req,res){
        const plant = await Plant.findById(req.params.id);
        const plant_mid = plant.quantity;
        const cart = Cart.find({});
        const cart_mid = cart.quantity;
        console.log(cart_mid);
        console.log(plant_mid)
         console.log (cart)
        res.status(200).json(plant_mid)

    }

}

module.exports = new MidController();