const jwt=require('jsonwebtoken')
const {secretKey}=require('../token/salt')
const expressjwt=require('express-jwt')


 const createToken=(payload=>{
     var token=jwt.sign(payload,secretKey,{expiresIn:60*60})
     return token
 })

//采用expressjwt校验token
const jwtAuth=expressjwt({
    secret:secretKey,
    algorithms:['HS256'],
    credentialsRequire:true
}).unless({
    path:["/api/Login","/api/setPassword","/api/Registration","/api/getCode","/api/verifyCode","/api/gg"]
})

module.exports={createToken,jwtAuth}
