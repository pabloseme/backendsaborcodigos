 //metodo especial para manejar las rutas
 const {Router}=require("express");
 const {check}=require('express-validator'); //el check es un middlewares
 const {menusGet,menusPost,menusPut,menusDelete}=require("../controllers/menus");
 const {validarCampos}=require('../middlewares/validar-campos');
// const rol = require("../models/rol");   no va
 const router=Router();
 const {existeMenuPorId,esCategoriaValido}=require("../helpers/db-validamenus");
 
 //endpoint o ruta, y uso el metodo get, indico la ruta y que funcion se ejecuta, recibe la solicitud y un una respuesta
  router.get('/', menusGet)        

  //el isEmail, verifica que el campo email, tenga formato de correo electronico
  router.post('/',
  [
  check("nombre","El nombre no puede estar vacio").notEmpty() ,
  check("img","Debe ingresar la imagen del menu").notEmpty(),
  //check("role","No es un Rol Valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
  check("nombcateg").custom(esCategoriaValido),    //esto vamos a validar contra las categorias
  validarCampos],
  menusPost)       
  
  router.put('/:id',
  [check("id","No es un ID valido").isMongoId(),
  check("id").custom(existeMenuPorId),
  validarCampos], 
  menusPut)       

  router.delete('/:id',
  [check("id","No es un ID valido").isMongoId(),
  check("id").custom(existeMenuPorId),
  validarCampos       
  ]
  ,menusDelete )    
  
  module.exports=router