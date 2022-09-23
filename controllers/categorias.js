const {request,response}=require("express");
const Categoria = require('../models/categoria');


//esto me trae el resultado de la validacion del check que esta en las rutas
const {validationResult}=require("express-validator")

const categoriasGet=async(req=request, res)=>{    
    const {limite=150,desde=0}=req.query;
    
    ///hacer ambas peticiones simultaneas de manera mas optimas
    const [categorias,total]= await Promise.all([
        Categoria.find({estado: true})
        .skip(desde)
        .limit(limite),
        Categoria.countDocuments({activo: true})
    ])
    
    res.json({
        total,
        limite,
        desde,
        categorias
    });
    
    
    }

const categoriasPost=async(req, res)=>{
    //const body= req.body;
 
    //destructuro el body para hacer validaciones
    const {nombre,activo}= req.body

    const categoria=new Categoria({nombre,activo})
   
    //metodo de mongoose para insertar un menu del restaurant
    await categoria.save()

    
    res.status(201).json({
        //msg :  "Peticion POST",
        categoria
        //api_key,
        //nombre
    });
}

const categoriasPut= async(req, res)=>{
    const {id}=req.params; //este es el id del menu que estoy buscando
    const{_id,...resto}=req.body; //necesito destructurar el body
   
    
    //buscar por id y actualizar, los datos segun el resto, el new:true (sirve para indicar en la respuesta el regstro actualizado)
    const categoria= await Categoria.findByIdAndUpdate(id,resto,{new:true})
    res.json({
        msg :  "Categoria actualizada",
        categoria        
    });
}

const categoriasDelete=async(req, res)=>{
    const {id}=req.params;

    //inactivar un usuario
    const query={activo: false}
    const categoriaBorrado=await Categoria.findByIdAndUpdate(id,query,{new:true})

    //borrar fisicamente un registro
    //const usuarioBorrado= await Usuario.findByIdAndRemove(id);

    res.json({
        msg :  "Categoria Borrada",
        categoriaBorrado
    });
}
module.exports={
    categoriasGet,
    categoriasPost,
    categoriasPut,
    categoriasDelete
};