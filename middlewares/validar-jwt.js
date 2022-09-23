const { request } = require('express')
const jwt= require('jsonwebtoken')
const Usuario=require('../models/usuario')

const validarJWT=async (req=request,res,next)=>{
    const token=req.header("x-token")

    ///verificar si viene el toke
    if(!token){
        return res.status(401).json({
            msg: "no reconoce el Token - Usuario no valido"
        })
    }

try {

    const {uid}=jwt.verify(token,process.env.SECRETORPRIVATE)
    
    //LEER EL USUARIO
    const usuario=await Usuario.findById(uid)

    //VERIFICAR SI EL USUARIO EXISTE
    if(!usuario){
        return res.status(401).json({
            msg: "Token no es Vaálido -  Usuario no existe"
        });
    }

    //VERIFICAR SI EL USUARIO ESTA ACTIVO
    if(!usuario.status){
        return res.status(401).json({
            msg: "Token no es Vaálido - Usuario suspendido"
        });        
    }


    //guardo en la request los datos del usuario, es decir creo una propiedad en el req.
    req.usuario = usuario


    next();
} catch (error) {
    console.log(error)
    res.status(401).json({
        msg:"Token no Válido"
    })
}

   
}


module.export={
    validarJWT
}