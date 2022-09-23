const express = require('express') //importar la libreri a de express
const cors = require('cors')
const {dbConnection}=require('../database/config')

//const {check}=require('express-validator'); //el check es un middlewares

class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT
        this.usuariosPath="/api/usuarios";
        this.menusPath="/api/menus";        
        this.pedidosPath="/api/pedidos";     
        this.categoriasmPath="/api/categoriasmenu"; 
        this.rolesPath="/api/roles";      
        this.paramPath="/api/param";   
        this.authPath="/api/auth";                                                 

       //conexion BD
       this.conectarDB()
        ///siempre pongo primero estas funciones de middlwares y luego las rutas
       this.middlewares();
    
       this.routes();
        
    }

    async conectarDB(){
            await dbConnection();
    }

    middlewares(){

        //lee en formato json lo que viene desde el front
        this.app.use(express.json());

        //agrego los cors para permitir peticiones desde otro direcciones
        this.app.use(cors())
    
        //defino una carpeta publica
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.usuariosPath,require("../routes/usuarios"));
        this.app.use(this.menusPath,require("../routes/menus"));        
        this.app.use(this.pedidosPath,require("../routes/pedid"));  
        //this.app.use(this.pedidosPath,require("../routes/pedidos"));  
        this.app.use(this.categoriasmPath,require("../routes/categorias"));  
       this.app.use(this.authPath,require("../routes/auth")); 
        //this.app.use(this.rolesPath,require("../routes/roles"));  
        //this.app.use(this.paramPath,require("../routes/param"));                                                  

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("server listo, PUERTOO : ",this.port)
        })        
    }
}

//export.default Server    ya no se usa mas

module.exports=Server