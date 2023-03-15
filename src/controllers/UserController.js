const User =require ('../modules/users')
const bcrypt = require('bcrypt');

class UserController{

    index(req,res) {
       res.render('home');
    //res.send(console.log("this is home page !"))
    }
    async login (req,res) {
      try{
          // let {nameUser,password} = req.query;
          const nameUser = req.body.nameUser;
          // console.log(req.body.password)
          // console.log(password)
          const user = await User.findOne({nameUser});
          // console.log(user.password)
          if(await bcrypt.compare(req.body.password,user.password))
          {       
              const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2m'});
  
              res.header('auth-token').send(accessToken);  }
          else {res.send('Wrong password!')}     
      }
      catch(error){
          res.status(404).json({message:error.message})   
      }
  }
    async user_register(req,res) {
      try { 
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password,salt);//faedgdsagsgs
          req.body.password = hashedPassword;
          // console.log(req.body.password)
          // console.log(req.body)
          // console.log(user.password)
          // console.log(hashedPassword) 
          const user = await User.create(req.body)
  
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
}
module.exports = new UserController();



