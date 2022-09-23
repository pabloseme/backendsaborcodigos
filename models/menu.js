const {Schema,model}=require('mongoose')

const MenuSchema=Schema({
    nombre:{
        type: String,
        required:[true,"El nombre del Menu es obligatorio"]
    },
    precio:{
        type:Number,
        required:[true,"El Precio es Obligatoria"]        
    },
    nombcateg:{
        type: String,
        required:[true,"La categoria es Obligatoria"]
    },   
    img:{
        type:String
    },
    activo:{
        type:Boolean,
        default:true
    }
})


//Menu, representa el modelo pero puede llevar otro nombre distinto al del archivo
module.exports=model("Menu",MenuSchema)