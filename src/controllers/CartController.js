const Cart = require('../modules/cart')
const Plant = require('../modules/plants')
// const Order = require ('../modules/order')
//add - delete 
const functionCart= require('../middleware/function')
const { forEach } = require('lodash')
class CartController{
    index(req,res){
        res.render('home')
    }
    async presentCart(req,res){
        try{
            const cart = await Cart.findOne({userId:req.user})
            if(!cart){
                return res.send('your cart is empty ! ')
            }
            res.status(200).json(cart);
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }

    async addcart (req,res){
            // console.log(req.user);
            // console.log(req.body);
            // const plant = req.body;
            console.log(req.user);   
            const cart = await Cart.findOne({userId:req.user})
            //console.log(cart);
            const plantInf = await Plant.findById(plant.plantId);
            // console.log(plantInf);
            if(plantInf.quantity <=  plant.quantity){ //bad quantity request 
                return  res.send('order to many plants! fail to order! ');
            }
            // console.log(cart.plants.length);
            if(!cart.plants.length){//check if cart are empty
                console.log('this cart is empty and about to add first plant');
                functionCart.add(cart,plant,plantInf);
                return res.send(cart);
            } 
            const pos = functionCart.findpos(cart,plant);
            if(pos < 0 ){
                  console.log('this old cart is going to add a new plant');
                  functionCart.add(cart,plant,plantInf);                  
                    return res.send(cart);   
                }
            // console.log(cart.plants[pos].quantity);
            if(plantInf.quantity <= cart.plants[pos].quantity + plant.quantity){
                return res.send('fail to order!');
            }
            console.log('this old cart is going to update plant');
            cart.plants[pos].quantity +=  plant.quantity;
            cart.plants[pos].price = plantInf.price;
            cart.plants[pos].discount = plantInf.discount;     
            functionCart.ordercheck(cart) 
            await Cart.findByIdAndUpdate(cart._id,cart)
            res.status(200).json(cart);   
    }
    
    async updateCart(req,res){
        try{
            const cart = await Cart.findOne({userId:req.user});
            // console.log(typeof req.body);
            const plant = req.body.plantArr;//plantArr
            functionCart.update(cart,plant);           
            res.status(200).json(cart);
        }catch(err){
            res.status(403).json({message: err.message})
        }          
    }



    async deleteItemCart(req,res){
        try{
            // console.log(req.user);
            const cart = await Cart.findOne({userId:req.user});
            // console.log(cart);
            const plant = req.body;
            console.log(plant);
            // console.log(cart.plants[2]);
            // console.log(plant.plantId);
            const indexPlant = functionCart.findpos(cart,plant);
            // console.log(indexPlant);
            if(indexPlant <0) return res.send('Plant not found!')
            cart.plants.splice(indexPlant,1);
            await Cart.findByIdAndUpdate(cart._id,cart)
            console.log('delete item success !');
            //return cart updated after delete
            res.status(200).json(cart)

        }catch(err){
            res.status(404).json({message: err.message})
        }
    }

    async deleteCart(req,res){
        try{
            const cart = await Cart.findOne({userId:req.user});
            await Cart.findByIdAndDelete(cart,cart.plants)
            console.log('delete cart success !');
            res.status(200).json(cart);

        }catch(error){
            res.status(404).json({error: error.message})
        }
    }


    





}module.exports = new CartController();