const Pedido=require('../models/pedido');



//VALIDAR ID SI EXISTE
const existePedidoPorId=async(id)=>{
        const existepedido= await Pedido.findOne({_id: id})
        if (!existepedido){
            throw new Error(`El Id ${id} no existe en la BD`);
            }         
    }

    

module.exports={    
    existePedidoPorId
    
}