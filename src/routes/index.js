
const UserRouter = require('./user')
const plantsRouter = require('./plants')
const kindsRouter = require ('./kinds')
const cartRouter = require ('./carts')
const payRouter = require ('./payment')

function route(app){


app.use('/user',UserRouter);
app.use('/plants',plantsRouter);
app.use('/kinds',kindsRouter);
app.use('/cart',cartRouter);
app.use('/pay',payRouter);
app.use('/',UserRouter);

}
module.exports = route;

