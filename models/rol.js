const {Schema,model}=require('mongoose')

const RolSchema=Schema({
    role:{
        type: String,
        required:[true,"El rol es obligatorio"]
    }
})

//Usuario, representa el modelo pero puede llevar otro nombre distinto al del archivo
module.exports=model("Roles",RolSchema)