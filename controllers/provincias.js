const {request,response}=require('express');
const Provincia = require('../models/provincias');
//const usuario=require('../models/usuario')

const bcrypt=require('bcryptjs');

//esto me trae el resultado de la validacion del check que esta en las rutas
const {validationResult}=require("express-validator")

const provinciasGet=async(req=request, res)=>{    
    //const {limite=25,desde=0}=req.query;
    const provinciasx= await Provincia.find()
    
    console.log(provinciasx)
    res.json({        
        provinciasx
    });
        
    }

const provinciasCodGet=async(req, res)=>{            
        const {codigo}=req.params;         
        const provinc= await Provincia.find({codigo})
        
        if (provinc.length===0){
            return res.status(401).json({
                msg: "El codigo ingresado no es correcto",
                estado: false
            })
        }else{
            console.log(provinc)  
            const {estado}=provinc[0]
            console.log(estado)

            res.json({   
                msg:"El codigo esta en la base de datos",
                estado
            });
        }

       
     
            
        }
    
const provinciasPost=async(req, res)=>{
    //const body= req.body;
 
    //destructuro el body para hacer validaciones
    const {codigo,provincia,estado}= req.body

    const provincianuevo=new Provincia({codigo,provincia,estado})
    //metodo de mongoose
    await provincianuevo.save()
    
    res.status(201).json({
        msg :  "Provincia creada correctamente",
        provincianuevo        
    });
}

const provinciasPut= async(req, res)=>{
    const {id}=req.params; 
    const{_id,codigo,provincia,estado,...resto}=req.body; //necesito destructurar el body

 
    //buscar por id y actualizar, los datos segun el resto, el new:true muestra en la respuesta el reg. actuaizado
    const provincianew= await Provincia.findByIdAndUpdate(id,resto,{new:true})
    res.json({
        msg :  "Provincia actualizado",
        provincianew       
    });
}

const provinciasDelete=async(req, res)=>{
    const {id}=req.params;

    //inactivar un usuario
    const query={estado: false}
    const provinciaInactiva=await Provincia.findByIdAndUpdate(id,query,{new:true})

    //borrar fisicamente un registro
    //const usuarioBorrado= await Usuario.findByIdAndRemove(id);

    res.json({
        msg :  "Provincia Inactiva",
        provinciaInactiva
    });
}
module.exports={
    provinciasGet,
    provinciasPost,
    provinciasPut,
    provinciasDelete,
    provinciasCodGet
};