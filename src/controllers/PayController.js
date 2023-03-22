const Cart = require('../modules/cart');
const Pay = require ('../modules/pay');


class PayController{
    index(req,res){
        res.render('home')
    }
    async getbill(req,res){
      try{
        console.log(req.user);
        const cart = await Cart.findById(req.params.id);
        // console.log(cart);
        // if(cart != null){









        res.status(200).json(cart);




      }catch(error){
        res.status(404).json({message:error.message});
      }


    }
}module.exports = new PayController();