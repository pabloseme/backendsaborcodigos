const bcrypt=require('bcryptjs')
const {generarJWT}= require('../helpers/generar-jwt')
const Usuario = require('../models/usuario')

const login=async(req,res)=>{
    const {email,password}=req.body

    try {
        
        //verificar si el email existe
        const usuario= await Usuario.findOne({email})

        console.log("hola");
        console.log(usuario);
        if(!usuario){
            return res.status(400).json({
                msg : "Email o Password incorrecto"
            })
        }
       
        ///verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario suspendido, comunicarse con el Administrador"
            })
        }

        //verificar la contraseña (usuario es el objeto que resulta de la busqueda con el mail)
        const validPassword= bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg : "Email o Password incorrecto"
            })
        }

        console.log('generar el token')
        //generar token active la linea de abajo para probar que me devuelva el token  usuario._id
        const token= await generarJWT('123456')

        res.status(200).json({
            usuario,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        })
    }


   

}

module.exports={
    login
}