const {Schema,model}=require('mongoose')

const CategoriaSchema=Schema({
    nombre:{
        type: String,
        required:[true,"El nombre de la Categoria es obligatorio"]
    },   
    activo:{
        type:Boolean,
        default:true
    }
})


//Menu, representa el modelo pero puede llevar otro nombre distinto al del archivo
module.exports=model("Categoria",CategoriaSchema)