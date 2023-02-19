var jwt=require('jsonwebtoken')
var signkey='jzh_first_token'  //添加盐


//封装生成token的方法
var setToken=function(user_name,user_id){
    return new Promise((resolve, reject)=>{

        var token=jwt.sign({user_name,user_id},signkey,{expiresIn:60*60})
        resolve(token)
    } )
}

//封装解析token的方法
var getToken=function(token){
    if (token==='undefined'){
        return {msg: '用户未登入，请先登入',status: 401}
    }
    try {
        var result = jwt.decode(token, signkey);

        //解密成功要判断token是否有效
        return {id:result.user_id,msg: 'token有效',status:200,token: token}
    }catch(e)
    {
        //解密失败则说明token过期
        return {msg:'token已过期或token无效',status:403,token:token}
    }

}



module.exports={
    setToken,
    getToken

}