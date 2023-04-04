const Order= require ('../modules/order')
const User = require('../modules/users')


class OrderController{ 
    index(req,res){
        res.render('home')
    }
    async getOrder (req,res){
        try{
            const order = await Order.findOne({userId:req.user});
            res.status(200).json(order)
        }catch (error){
            res.status(404).json({error: error.message})
        }
    }

    async putOrder(req,res){
        try{
            console.log(req.user);
            const updateOrder = await Order.findOne({userId:req.user._id})
            updateOrder.finalTotal -= req.recive;
            const user =await User.findById(req.user)
            await user.listOrder.push(updateOrder);
            console.log(user.listOrder);
            await User.findByIdAndUpdate(req.user,user)
            await Order.findOneAndUpdate({userId:req.user},req.body)
            console.log('success!');
            res.status(200).json(updateOrder)
            // res.status(200).json(order)
        }catch(error){
            res.status(404).json({error: error.message})
        }
    }

    async delete(req,res){
        try{
            await Order.findByIdAndDelete(req.body.orderId)
            res.send('you have delete your Order!')
        }catch(error){
            res.status(404).json({error: error.message})
        }
    }




}module.exports = new OrderController();

