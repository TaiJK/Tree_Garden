
const UserRouter = require('./user')
const plantsRouter = require('./plants')
const kindsRouter = require ('./kinds')
const cartRouter = require ('./carts')
const midRouter = require('./mid')
function route(app){


app.use('/user',UserRouter);
app.use('/plants',plantsRouter);
app.use('/kinds',kindsRouter);
app.use('/cart',cartRouter);
app.use('/mid',midRouter);
app.use('/',UserRouter);

}
module.exports = route;

