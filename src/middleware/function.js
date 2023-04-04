const { response } = require("express");
const Cart = require("../modules/cart");
const Order = require ('../modules/order')

async function add(cart,plant,plantInf){
    // console.log(cart);
    // console.log(plantInf);
    // console.log(plant);
    if(plantInf.quantity <= plant.quantity ){
        return res.send('to much quantity! Fail to Order');
    }
    if(plantInf <= plant.quantity + cart.plants.quantity){
        return response.send('Out of Stock !');
    }
    Object.assign(plant,{price : plantInf.price});
    Object.assign(plant,{discount : plantInf.discount});
    cart.plants.push(plant);
    // console.log(cart.plants);
    await Cart.findByIdAndUpdate(cart._id,cart)   


}
async function order(array,cart){
    // tính toán hóa đơn
    let temporaryTotal = 0;
    let totalDiscount = 0;
    let total = 0;
    array.forEach(getTemporaryTotal);
    function getTemporaryTotal(item){
        temporaryTotal+= item.price*item.quantity ;
        // console.log(temporaryTotal);
        totalDiscount = totalDiscount + (item.price*item.quantity*item.discount/100);
        // console.log(totalDiscount);
        total = temporaryTotal- totalDiscount;
        // console.log(total);
    }
    Object.assign(temporaryTotal,cart.total)
    Object.assign(totalDiscount,cart.discount)
    Object.assign(total,cart.finalTotal)
    return [temporaryTotal,totalDiscount,total];
}
async function  update(cart,plant){
    // console.log(cart);
    // console.log(plant);
    if(!plant){return res.send('request empty');}
    await plant.forEach(async item => {
         const indexPlant = cart.plants.findIndex((id) =>{
            return id.plantId === item.plantId;
        })
        // console.log(indexPlant);
        // console.log(cart.plants[indexPlant]);
        // console.log(plant[indexPlant]);
        cart.plants[indexPlant].quantity += plant[indexPlant].quantity;
        // console.log(cart.plants[indexPlant]);
        await Cart.findByIdAndUpdate(cart._id,cart);


     });
}
function findpos(cart,plant){
    // console.log('to find');
    // console.log(plant.plantId);
    const indexPlant = cart.plants.findIndex((item) =>{
        return item.plantId === plant.plantId;     
        })
        return indexPlant;
}
module.exports ={
    add,
    findpos,
    update,
    order
}