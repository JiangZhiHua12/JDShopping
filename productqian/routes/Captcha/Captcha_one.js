const express = require("express");
const {randomCode,sendCode}=require("../Captcha/Captcha_tow");
const router=express.Router()
const sqlquery=require('../../public/javascripts/mysql')
const  bcrypt = require("bcryptjs");


router.get('/getCode',async (req,res)=>{

    let code=randomCode(6);//生成6位数字随机验证码
    var phone=req.query.phone
    console.log(phone)
    //哈希加密验证码
    var hashedCode=await bcrypt.hash(code,8)
    console.log('----11')
    console.log(hashedCode)
    var sql='insert into captcha (phone,code) values (?,?)'
    var result=await sqlquery(sql,[phone,hashedCode])
    console.log(result)

    sendCode(phone,code,function(success){
        if(success){
            res.json("短信验证码已发送");
        }else{
            res.json("短信验证码发送失败");
        }
    })

    //60秒后验证码失效
    setTimeout(async function () {
        var sql2='delete from captcha where phone=?'
        var result2=await sqlquery(sql2,[phone])
        console.log(result2)
    },60000)
})

router.post('/verifyCode',async (req,res)=>{
    var phone=req.body.phone
    var code=req.body.code
    console.log(phone)
    console.log(code)

    try {
        var sql='SELECT * FROM userdb.captcha where phone=?;'
        var result=await sqlquery(sql,[phone])
        console.log(result)
        var ismatch=await bcrypt.compare(code,result[0].code)
        console.log('hahaha')
        console.log(ismatch)
        if (ismatch==true){
            res.json({
                status:0,
                message:'验证成功'
            })
        }else {
            res.json({
                status:1,
                message:'验证码不正确'
            })
        }
        console.log('-----')
    }
    catch (e) {


        res.json({
            status:2,
            message:'验证码已失效，请重新获取验证码'
        })
    }




})

module.exports=router


