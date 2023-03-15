const Kind = require('../modules/kinds')

class KindController{
    index(req,res){
        res.render('home')
    }
    async getKinds (req,res) {
    try{
        const kinds = await Kind.find({});

       
       // res.send('Wellcome to kind of plant')
        res.status(200).json(kinds);

    }catch(error){
        res.status(500).json({message: error.message})

    }
    }
    async getKindsbyid (req,res) {
        try{

            const kinds = await Kind.findById(req.params.id)
    
           
           // res.send('Wellcome to kind of plant')
            res.status(200).json(kinds);
    
        }catch(error){
            res.status(500).json({message: error.message})
    
        }
        }
    async postKind(req,res) {
    try { 
      console.log('post success kind')
      const kinds = await Kind.create(req.body)
      res.status(200).json(kinds);
  
    }catch(error){
      console.log(error.message);
      console.log(' dumpest code on kinds')   
      res.status(500).json({message: error.message})
    }
  
  }
  async putKind(req,res)  {
    try {
        let id = req.params.id
        const Kinds = await Kind.findByIdAndUpdate(id,req.body)   
        if(!Kinds){
            return res.status(404).json({message:`cant not find the product with ID: ${id}`})

            }
            const updatedKinds = await Kind.findById(id);
            res.status(200).json(updatedKinds);
        }
      catch(error){
        res.status(500).json({message: error.message})
    }
}
async deleteKind(req,res) {
    try {
        const {id} = req.params
        console.log(id) 
        const kind = await Kind.findByIdAndDelete(id);
        if(!kind){
            return res.status(500).json({message: `can not find product with id: ${id}`})

        }
        res.status(200).json('delete success!')

    }catch(error){
        res.status(500).json({message: error.message})
    }
}



}
module.exports = new KindController();