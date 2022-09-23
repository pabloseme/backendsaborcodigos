const jwt=require('jsonwebtoken')

//voy amandar el id del usuario
const  generarJWT=(uid)=>{
    return new Promise((resolve,reject)=>{
        const payload={uid}

        jwt.sign(payload,process.env.SECRETORPRIVATE,{expiresIn :"4h"},(err,token)=>{
            if(err){
                console.log(err)
                reject("No se genero el Token");
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT
}