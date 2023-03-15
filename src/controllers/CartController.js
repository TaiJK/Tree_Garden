const Cart = require('../modules/cart')
const Plant = require('../modules/plants')

//add - delete 

class CartController{
    index(req,res){
        res.render('home')
    }
    async presentCart(req,res){
        try{
            const cart = await Cart.find();
            //check array is null
            if(cart.plant == null ){
                
                res.status(200).json('Tiếp tục mua sắm')}
            else {
                    res.status(200).json(cart);
            }

        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }

    async addCart (req,res){
        try{
            const id = req.params.id;
            console.log(req.params.id)
            const cart = await Cart.findById(id)
            if (cart.plant != null){
                cart.plant.push(Plant);
                cart.quantity++;
                console.log(cart.quantity);
                cart.sum += cart.plant[Plant.price];
                console.log(cart.sum);
                cart.total = cart.sum - cart.totalDiscount;
                console.log(cart.total);
            }        
            res.status(200).json(cart);   
        }
        catch(error){
            res.status(404).json({message: error.message})
        }
    }






}module.exports = new CartController();