const {request,response}=require("express");
const Pedido = require('../models/pedido');


//esto me trae el resultado de la validacion del check que esta en las rutas
const {validationResult}=require("express-validator")

const pedidoGet=async(req=request, res)=>{    
    const {limite=150,desde=0}=req.query;
    
    ///hacer ambas peticiones simultaneas de manera mas optimas
    const [pedidos,total]= await Promise.all([
        Pedido.find({estado: "PENDIENTE"})
        .skip(desde)
        .limit(limite),
        Pedido.countDocuments({estado: "PENDIENTE"})
    ])
    
    res.json({
        total,
        limite,
        desde,
        pedidos
    });
    
    
    }

const pedidoPost=async(req, res)=>{
    //const body= req.body;
 
    //destructuro el body para hacer validaciones
    const {fecha,menu,cant,preciounit,estado,usuario,activo}= req.body

    const pedido=new Pedido({fecha,menu,cant,preciounit,estado,usuario,activo})
   
    //metodo de mongoose para insertar un menu del restaurant
    await pedido.save()

    
    res.status(201).json({
        //msg :  "Peticion POST",
        pedido
        //api_key,
        //nombre
    });
}

const pedidoPut= async(req, res)=>{
    const {id}=req.params; //este es el id del menu que estoy buscando
    const{_id,...resto}=req.body; //necesito destructurar el body
   
    
    //buscar por id y actualizar, los datos segun el resto, el new:true (sirve para indicar en la respuesta el regstro actualizado)
    const pedido= await Pedido.findByIdAndUpdate(id,resto,{new:true})
    res.json({
        msg :  "Pedido actualizado",
        pedido        
    });
}

const pedidoDelete=async(req, res)=>{
    const {id}=req.params;

    //inactivar un usuario
    const query={activo: false}
    const pedidoBorrado=await Pedido.findByIdAndUpdate(id,query,{new:true})

    //borrar fisicamente un registro
    //const usuarioBorrado= await Usuario.findByIdAndRemove(id);

    res.json({
        msg :  "Pedido Borrado",
        pedidoBorrado
    });
}
module.exports={
    pedidoGet,
    pedidoPost,
    pedidoPut,
    pedidoDelete
};