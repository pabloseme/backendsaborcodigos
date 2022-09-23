//metodo especial para manejar las rutas
const {Router}=require("express");
const {check}=require('express-validator'); //el check es un middlewares
const {categoriasGet,categoriasPost,categoriasPut,categoriasDelete}=require("../controllers/categorias");
const {validarCampos}=require('../middlewares/validar-campos');
const router=Router();
const {existeCategPorId}=require("../helpers/db-validacategorias");

//endpoint o ruta, y uso el metodo get, indico la ruta y que funcion se ejecuta, recibe la solicitud y un una respuesta
//router.get('/:codigo',provinciasCodGet)
 
router.get('/',
 categoriasGet)       
 
 

 //el isEmail, verifica que el campo email, tenga formato de correo electronico
 router.post('/',
 [
 check("nombre","El Nombre de la Categoria no puede estar vacia").notEmpty() , 
 check("activo","No es un Estado Valido").isIn([true,false]),
 validarCampos],
 categoriasPost)       
 
 router.put('/:id',
 [check("id","No es un ID valido").isMongoId(),
 check("id").custom(existeCategPorId),
 check("activo","No es un Estado Valido").isIn([true,false]),
 validarCampos], 
 categoriasPut)       

 router.delete('/:id',
 [check("id","No es un ID valido").isMongoId(),
 check("id").custom(existeCategPorId),
 validarCampos       
 ]
 ,categoriasDelete )    
 
 module.exports=router