const rol=require('../models/rol');
const Usuario=require('../models/usuario');


const esRoleValido=async (role="")=>{
    const existeRole=await rol.findOne({role});
    if(!existeRole){
           throw new Error(`El rol ${role} no existe en la BD`);
    }
}

//validar si el mail existe
const existeEmail= async (email)=>{
   const existeEmail=await Usuario.findOne({email})
    if (existeEmail){
        throw new Error(`El Correo ${email} ya existe en la BD`);
        }
    }

    //VALIDAR ID SI EXISTE
    const existeUsuarioPorId=async(id)=>{
        const existeusuario= await Usuario.findOne({_id: id})
        if (!existeusuario){
            throw new Error(`El Id ${id} no existe en la BD`);
            }         
    }

       //VALIDAR COD DE PROVINCIA  SI EXISTE
       const esCodValido=async(codigo)=>{
        const existeprovinc= await Provincia.findOne({codigo})
        if (!existeprovinc){
            throw new Error(`El Codigo ${codigo} no es correcto`);
            }         
    }



module.exports={
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    esCodValido
}