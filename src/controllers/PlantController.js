const Plant = require('../modules/plants');
const Kind = require('../modules/kinds');
class PlantController{  

    async index(req,res){
      console.log(req.user._id);
      console.log('wrong way');
      res.status(200).json('check success!')
      
     
    }
    async getPlants(req,res){
      try{
        let {page =1, limit=10} = req.query;
        const skip =(page -1)*10;
        const plants = await Plant.find({}).skip(skip).limit(limit);

        res.status(200).json(plants)

    }catch(error){
        res.status(500).json({message: error.message})

    }
    } 
    async getPlant_Number(req,res)  {    
      
      try{
              const id =req.params.id;
              // console.log(id);
              // console.log('Request Id:', typeof(req.params));
              let plant = await Plant.findById(id);
              res.status(200).json(plant)
      
          }catch(error){
             res.status(404).json({message: error.message})
            
          }}

    async putPlant_update(req,res)  {
      try {
              const id = req.body.plantId
              const plant = await Plant.findByIdAndUpdate(id,req.body)   
              if(!plant){
                 return res.status(404).json({message:`cant not find the product with ID: ${id}`})
              }
              const updatedPlant = await Plant.findById(id);
              console.log('plant updated !');
              res.status(200).json(updatedPlant);
              }
      catch(error){
              res.status(500).json({message: error.message})
            }
        }

    async postPlant(req,res) {
      try {

            const kind = await Kind.find({'nameKind': req.body.kind});
            req.body.kind = kind;
            const plants = await Plant.create(req.body)
            console.log('post plant success! ');
            res.status(200).json(plants);
        
          }catch(error){
            console.log(error.message);
            console.log(' dumpest code')   
            res.status(500).json({message: error.message})
          }
        }
    async deletePlant(req,res){
      try {
              const {id} = req.params
              console.log(id) 
              const plant = await Plant.findByIdAndDelete(id);
              if(!plant){
                  return res.status(500).json({message: `can not find product with id: ${id}`})
      
              }
              res.status(200).json({plant})
      
          }catch(error){
              res.status(500).json({message: error.message})
          }
      }

}
module.exports = new PlantController();

