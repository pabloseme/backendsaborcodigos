const {validationResult}=require("express-validator")


///este funcion la puedo usar en mis rutas para validar los campos, ya se ane el put,post,delete 
const validarCampos=(req,res,next)=>{
    const errors=validationResult(req)  //almacena todos los errores que me devuelve el check
    //si no esta vacia
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next(); //en caso de no haber ningun error continuar el proceso
}

//para exportar la funcion
module.exports={
    validarCampos
}
