const Cart = require('../modules/cart')
const Plant = require('../modules/plants')
//add - delete 
const addcart = require('../middleware/checkAddcart')
class CartController{
    index(req,res){
        res.render('home')
    }
    async presentCart(req,res){
        try{
            const cart = await Cart.findOne({userId:req.user})
            res.status(200).json(cart);
        }
        catch(error){
            res.status(400).json({message: error.message})
        }
    }

    async addCart (req,res){
            // console.log(idcart);
            const plant = req.body;
            const cart = await Cart.findOne({userId:req.user})
            const plantInf = await Plant.findById(plant.plantId);
            if(plantInf.quantity <  plant.quantity){ //bad quantity request 
                return  res.send('fail to order!');
            }
            if(!cart.plants.length){//check if cart are empty
                console.log('this cart is empty and about to add first plant');
                addcart.add(cart,plant,plantInf);   
                await Cart.findByIdAndUpdate(cart._id,cart)
                return res.send(cart);
            }
            const pos = addcart.findpos(cart,plant);
            // console.log(pos);
            if(pos < 0 ){
                  console.log('this old cart is going to add a new plant');
                  addcart.add(cart,plant,plantInf);
                  await Cart.findByIdAndUpdate(cart._id,cart)
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
            await Cart.findByIdAndUpdate(cart._id,cart)  
            res.status(200).json(cart);   
    }

    async updateCart(req,res){
            const cart = await Cart.findOne({userId:req.user});
            const plant = req.body;
            // console.log(plant);
            const pos = addcart.findpos(cart,plant);
            // console.log(pos);
            if(pos < 0)return res.send('wrong way');
            // console.log(cart);
            switch(plant.method){
                case 'add':
                   addcart.add1(cart,pos);
                //    cart.plants[pos].quantity += 1;
                   await Cart.findByIdAndUpdate(cart._id,cart);
                   console.log('add 1 success');
                   break;
                case "decree":
                    addcart.decree1(cart,pos);
                    await Cart.findByIdAndUpdate(cart._id,cart);
                    console.log('decree 1 success');
                    break;
            }
            res.status(200).json(cart);
    }



    async deleteItemCart(req,res){
        try{
            // console.log(req.user);
            const cart = await Cart.findOne({userId:req.user});
            // console.log(cart);
            const plant = req.body;
            // console.log(cart.plants[2]);
            // console.log(plant.plantId);
            const indexPlant = addcart.findpos(cart,plant);
            // console.log(indexPlant);
            if(indexPlant <0) return res.send('PLant not found!')
            cart.plants.splice(indexPlant,1);
            await Cart.findByIdAndUpdate(cart._id,cart)
            res.status(200).json(cart)

        }catch(err){
            res.status(404).json({message: err.message})
        }
    }

    





}module.exports = new CartController();