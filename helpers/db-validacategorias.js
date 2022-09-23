const Menu=require('../models/categoria');



//VALIDAR ID SI EXISTE
const existeCategPorId=async(id)=>{
        const existecategoria= await Menu.findOne({_id: id})
        if (!existecategoria){
            throw new Error(`El Id ${id} no existe en la BD`);
            }         
    }

    

module.exports={    
    existeCategPorId
    
}