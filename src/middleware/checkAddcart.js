

function add(cart,plant,plantInf){
    // console.log(cart);
    // console.log(plantInf);
    // console.log(plant);
    Object.assign(plant,{price : plantInf.price});
    Object.assign(plant,{discount : plantInf.discount});
    cart.plants.push(plant);
    // console.log(cart.plants);
    // Cart.findByIdAndUpdate(cart._id,cart)   


}

function add1(cart,pos){
        cart.plants[pos].quantity += 1;

}
function decree1(cart,pos){
    cart.plants[pos].quantity -= 1;
}

function findpos(cart,plant){
    // console.log('to find');
    // console.log(plant);
    const indexPlant = cart.plants.findIndex((item) =>{
        return item.plantId === plant.plantId;     
        })
        return indexPlant
}
module.exports ={
    add,
    findpos,
    add1,
    decree1
}