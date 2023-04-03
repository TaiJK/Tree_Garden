const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars').engine;
const app = express()
const YAML = require('yamljs');
const swaggerJSDoc = YAML.load('./swaggerapi.yaml');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}
const StripePublickey = process.env.STRIPE_SECRET_KEY
const StripeSecretKey = process.env.STRIPE_PUBLIC_KEY
app.use(bodyParser.urlencoded({ extended: true }))
const route = require('./src/routes/index');
app.use(bodyParser.json())   

//template engine 
app.engine('hbs',handlebars({
    extname: '.hbs'
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'src/views'))
//config path on localhost 
console.log(__dirname)
app.use(express.static(path.join(__dirname,'src/publicPic')));
//use express packages
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//config routeroute
route(app)

console.log('PATH: ',path.join(__dirname,'src/views'))

//swagger API 
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerJSDoc));



//=======================   PLANTS  ==================================



// //get all plants    
// app.get(`/plants`,verify,async (req,res) =>{
//     try{
//         let {page =1, limit=10} = req.query;
//         const skip =(page -1)*10;
//         const plants = await Plant.find({}).skip(skip).limit(limit);

//         res.status(200).json(plants)

//     }catch(error){
//         res.status(500).json({message: error.message})

//     }
//     }
// ) 

// //find id / name /...
// app.get('/plants/:number',async(req,res) => {    
      
//     try{
//             const id = Number(req.params.number);
//             console.log('Request Id:', typeof(req.params.number));
//             let plant = await Plant.findOne({'id': id});
//             res.status(200).json(plant)
    
//         }catch(error){
//            res.status(404).json({message: error.message})
          
//         }})



// //update data
// app.put('/plants/:id',async(req,res) => {
//     try {
//         let id = req.params.id
//         const plant = await Plant.findByIdAndUpdate(id,req.body)   
//         if(!plant){
//             return res.status(404).json({message:`cant not find the product with ID: ${id}`})

//             }
//             const updatedPlant = await Plant.findById(id);
//             res.status(200).json(updatedPlant);
//         }
//       catch(error){
//         res.status(500).json({message: error.message})
//     }
// })





// // create a product push into database
// app.post('/plants',async(req,res) =>{
//     try { 
//       const plants = await Plant.create(req.body)
//         console.log(req);  
//         res.status(200).json(plants);
  
//     }catch(error){
//       console.log(error.message);
//       console.log(' dumpest code')   
//       res.status(500).json({message: error.message})
//     }
    
//   })



// //delete a product 
// app.delete(`/plants/:id`,async(req,res) => {
//     try {
//         const {id} = req.params
//         console.log(id) 
//         const plant = await Plant.findByIdAndDelete(id);
//         if(!plant){
//             return res.status(500).json({message: `can not find product with id: ${id}`})

//         }
//         res.status(200).json({plant})

//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// // ==================================KIND==========================
// // app.get(`/kinds`,async (req,res) =>{
// //     try{    
// //         const kinds = await Kind.find({});

       
// //        // res.send('Wellcome to kind of plant')
// //         res.status(200).json(kinds);

// //     }catch(error){
// //         res.status(500).json({message: error.message})

// //     }
// //     }
// // )


// // app.post('/kinds',async(req,res) =>{
// //     try { 
// //       console.log('post success kind')
// //       const kinds = await Kind.create(req.body)
// //       res.status(200).json(kinds);
  
// //     }catch(error){
// //       console.log(error.message);
// //       console.log(' dumpest code on kinds')   
// //       res.status(500).json({message: error.message})
// //     }
  
// //   })
// // app.put('/kinds/:id',async(req,res) => {
// //     try {
// //         let id = req.params.id
// //         const Kinds = await Kind.findByIdAndUpdate(id,req.body)   
// //         if(!Kinds){
// //             return res.status(404).json({message:`cant not find the product with ID: ${id}`})

// //             }
// //             const updatedKinds = await Kind.findById(id);
// //             res.status(200).json(updatedKinds);
// //         }
// //       catch(error){
// //         res.status(500).json({message: error.message})
// //     }
// // })

// // app.delete(`/kinds/:id`,async(req,res) => {
// //     try {
// //         const {id} = req.params
// //         console.log(id) 
// //         const kind = await Kind.findByIdAndDelete(id);
// //         if(!kind){
// //             return res.status(500).json({message: `can not find product with id: ${id}`})

// //         }
// //         res.status(200).json({kind})

// //     }catch(error){
// //         res.status(500).json({message: error.message})
// //     }
// // })

// // ============================================== USER ===================================
// // register a account 
// app.post('/user/register',async(req,res) =>{
//     try { 
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password,salt);//faedgdsagsgs
//         req.body.password = hashedPassword;
//         // console.log(req.body.password)
//         // console.log(req.body)
//         // console.log(user.password)
//         // console.log(hashedPassword) 
//         const user = await User.create(req.body)

//         // console.log(returnUpdate)
//         // console.log(user.password)
//         // console.log(user)
//         res.status(200).json(user)
        
//     }catch(error){
//       console.log(error.message);
//       console.log(' dumpest code')   
//       res.status(500).json({message: error.message})
//     }
    
//   })
// // get inf user (all)
// app.get('/user',async (req,res) =>{
//     try{
//         let page = parseInt(req.query.page);   
//         let limit = parseInt(req.query.limit);
//         if(isNaN(page) == true ){
//             page = 1;
//         }
//         if(isNaN(limit) == true){
//             limit = 10;
//         }
//         const count = await User.count();
//         const userData = await User.find().skip((page - 1) * limit).limit(limit)
//         // console.log(userData)
//         const currentPage = {}
//         currentPage.currentPage ={
//             totalUsers: count,
//             page: page,
//             limit: limit
//         } 
//         currentPage.datapage= userData;      
//         res.status(200).json(currentPage)

//     }catch(error){
//         res.status(500).json({message: error.message})

//     }
//     }
// ) 
// //================== Authorzise - login - return a Token ==========================
// app.get('/user/login',verify,async(req,res) =>{
//     try{
//         // let {nameUser,password} = req.query;
//         const nameUser = req.body.nameUser;
//         // console.log(req.body.password)
//         // console.log(password)
//         const user = await User.findOne({nameUser});
//         // console.log(user.password)
//         if(await bcrypt.compare(req.body.password,user.password))
//         {       
//             const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2m'});

//             res.header('auth-token').send(accessToken);  }
//         else {res.send('Wrong password!')}     
//     }
//     catch(error){
//         res.status(404).json({message:error.message})   
//     }
// })


//================================ End producttion =====================================
//================================Connect Database=====================================
const PORT = process.env.PORT || 3000
app.listen(3000,() => { 
    console.log(' Node js file is runnig on port 3000')
})
mongoose.set("strictQuery",false)
//connect database
mongoose
.connect('mongodb+srv://tranductai:tranductai@cluster0.tte9ocp.mongodb.net/NodeAPI?retryWrites=true&w=majority')
.then(() => {
    console.log('conected to Mongodb')

}).catch(() => {
    console.log(err);
})
//=============================== End of Code view ==============================================





