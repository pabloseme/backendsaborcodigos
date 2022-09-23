//metodo especial para manejar las rutas
const {Router}=require("express");
const {check}=require('express-validator'); //el check es un middlewares
const {provinciasGet,provinciasPost,provinciasPut,provinciasDelete,provinciasCodGet}=require("../controllers/provincias");
const {validarCampos}=require('../middlewares/validar-campos');
//const Provincias = require("../models/provincias");
const router=Router();
const {esRoleValido,existeEmail,existeUsuarioPorId,esCodValido}=require("../helpers/db-validators");

//endpoint o ruta, y uso el metodo get, indico la ruta y que funcion se ejecuta, recibe la solicitud y un una respuesta
router.get('/:codigo',provinciasCodGet)
 
router.get('/',
 provinciasGet)       
 
 

 //el isEmail, verifica que el campo email, tenga formato de correo electronico
 router.post('/',
 [check("codigo","El codigo debe tener como minimo 3 digitos").isLength({min:3}),
 check("provincia","La Provincia no puede estar vacia").notEmpty() , 
 check("estado","No es un Estado Valido").isIn([true,false]),
 validarCampos],
 provinciasPost)       
 
 router.put('/:id',
 [check("id","No es un ID valido").isMongoId(),
 check("id").custom(existeUsuarioPorId),
 check("estado","No es un Estado Valido").isIn([true,false]),
 validarCampos], 
 provinciasPut)       

 router.delete('/:id',
 [check("id","No es un ID valido").isMongoId(),
 check("id").custom(existeUsuarioPorId),
 validarCampos       
 ]
 ,provinciasDelete )    
 
 module.exports=router