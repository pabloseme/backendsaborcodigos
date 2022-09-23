const Menu=require('../models/menu');
const Categoria=require('../models/categoria');



const esCategoriaValido=async (categ="")=>{
    const existeRole=await Categoria.findOne({nombre:categ});
    if(!existeRole){
           throw new Error(`La categoria ${categ} no existe en la BD`);
    }
}



    //VALIDAR ID SI EXISTE
    const existeMenuPorId=async(id)=>{
        const existemenu= await Menu.findOne({_id: id})
        if (!existemenu){
            throw new Error(`El Id ${id} no existe en la BD`);
            }         
    }
     

module.exports={    
    existeMenuPorId,
    esCategoriaValido
    
}