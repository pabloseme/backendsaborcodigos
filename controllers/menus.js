const {request,response}=require("express");
const Menu = require('../models/menu');


const bcrypt=require('bcryptjs');

//esto me trae el resultado de la validacion del check que esta en las rutas
const {validationResult}=require("express-validator")

const menusGet=async(req=request, res)=>{    
    const {limite=200,desde=0}=req.query;
    
    ///hacer ambas peticiones simultaneas de manera mas optimas
    const [menus,total]= await Promise.all([
        Menu.find({activo: true})
        .skip(desde)
        .limit(limite),
        Menu.countDocuments({activo: true})
    ])
    
    res.json({
        total,
        limite,
        desde,
        menus
    });
    
    
    }

const menusPost=async(req, res)=>{
    //const body= req.body;
 
    //destructuro el body para hacer validaciones
    const {nombre,precio,activo,img,nombcateg}= req.body

    const menusProd=new Menu({nombre,precio,activo,img,nombcateg})
   
    //metodo de mongoose para insertar un menu del restaurant
    await menusProd.save()

    
    res.status(201).json({
        //msg :  "Peticion POST",
        menusProd
        //api_key,
        //nombre
    });
}

const menusPut= async(req, res)=>{
    const {id}=req.params; //este es el id del menu que estoy buscando
    const{_id,...resto}=req.body; //necesito destructurar el body
   
    
    //buscar por id y actualizar, los datos segun el resto
    const menusProd= await Menu.findByIdAndUpdate(id,resto,{new:true})
    res.json({
        msg :  "Menu actualizado",
        menusProd        
    });
}

const menusDelete=async(req, res)=>{
    const {id}=req.params;

    //inactivar un usuario
    const query={activo: false}
    const menusProdBorrado=await Menu.findByIdAndUpdate(id,query,{new:true})

    //borrar fisicamente un registro
    //const usuarioBorrado= await Usuario.findByIdAndRemove(id);

    res.json({
        msg :  "Menu Borrado",
        menusProdBorrado
    });
}
module.exports={
    menusGet,
    menusPost,
    menusPut,
    menusDelete
};