
const UserRouter = require('./user')
const plantsRouter = require('./plants')
const kindsRouter = require ('./kinds')
const cartRouter = require ('./carts')
const orderRouter = require ('./order')

function route(app){

app.use('/home',UserRouter);
app.use('/user',UserRouter);
app.use('/plants',plantsRouter);
app.use('/kinds',kindsRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/',UserRouter);

}
module.exports = route;

