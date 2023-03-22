const User =require ('../modules/users')
const bcrypt = require('bcrypt');
const Cart = require ('../modules/cart')
const jwt= require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config()

class UserController{

    index(req,res) {
       res.render('home');
    //res.send(console.log("this is home page !"))
    }
    async login (req,res) {
      try{
          // let {nameUser,password} = req.query;
          const nameUser = req.body.nameUser;
          console.log(req.body.password)
          const user = await User.findOne({nameUser});
          console.log(user._id)
          const payload = {
            _id: user._id
          }
          if(await bcrypt.compare(req.body.password,user.password))
          {       
              const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10d'});
  
              res.header('auth-token').send(accessToken);  }
          else {res.send('Wrong password!')}     
      }
      catch(error){
          res.status(404).json({message:error.message})   
      }
  }
    async user_register(req,res) {
      try { 
        // console.log(req.body)
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password,salt);//faedgdsagsgs
          req.body.password = hashedPassword;
        //   console.log(req.body.password)
        //   console.log(req.body)
        //   console.log(user.password)
        //   console.log(hashedPassword) 
          const user = await User.create(req.body);
          // console.log(typeof user._id)
          const payload ={
            userId : user._id
          }
        //   console.log(user)
        //     console.log(user)
          const cart = await Cart.create(payload);
          console.log(payload._id);
          console.log(cart);

          // console.log(returnUpdate)
          // console.log(user.password)
          // console.log(user)
          res.status(200).json(user)
          
      }catch(error){
        console.log(error.message);
        console.log(' dumpest code')   
        res.status(500).json({message: error.message})
      }
      
    }
    async getUser(req,res) {
      try{
          let page = parseInt(req.query.page);   
          let limit = parseInt(req.query.limit);
          if(isNaN(page) == true ){
              page = 1;
          }
          if(isNaN(limit) == true){
              limit = 10;
          }
          const count = await User.count();
          const userData = await User.find().skip((page - 1) * limit).limit(limit)
          // console.log(userData)
          const currentPage = {}
          currentPage.currentPage ={
              totalUsers: count,
              page: page,
              limit: limit
          } 
          currentPage.datapage= userData;      
          res.status(200).json(currentPage)
  
      }catch(error){
          res.status(500).json({message: error.message})
  
      }
      }
      async putUser_update(req,res)  {
        try {
                let id = req.params.id
                const user = await User.findByIdAndUpdate(id,req.body)   
                if(!user){
                   return res.status(404).json({message:`cant not find User with ID: ${id}`})
                }
                const updatedUser = await User.findById(id);
                res.status(200).json(updatedUser);
                }
        catch(error){
                res.status(500).json({message: error.message})
              }
          }
    async deletePlant(req,res){
      try {
        const {id} = req.params
        console.log(id) 
        const user = await User.findByIdAndDelete(id);
        if(!plant){
          return res.status(500).json({message: `can not find product with id: ${id}`})   
                    }
        res.status(200).json({user})      
            }catch(error){
              res.status(500).json({message: error.message})
                }
            }
            
}
module.exports = new UserController();



