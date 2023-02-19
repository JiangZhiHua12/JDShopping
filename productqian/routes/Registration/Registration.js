const sqlquery=require('../../public/javascripts/mysql')
const bcryrpt=require('bcryptjs')
const express=require('express')
const router=express.Router()

router.post('/Registration', async (req,res)=>{
    var username=req.body.username
    var password=req.body.password
    var phone=req.body.phone
    var email=req.body.email
    //哈希加密,计算8次
    var hashedPassword=await bcryrpt.hash(password,8)
    var arr=[username,hashedPassword,email,phone]

    var sql2='SELECT * FROM userdb.jd_user where username=?'
    var result2=await sqlquery(sql2,[username])
    console.log(result2[0])

    if (result2[0]==undefined){
        try {
            var sql='INSERT INTO userdb.jd_user (`username`, `password`, `email`, `phone`) VALUES (?,?,?,?)'
            var result=await sqlquery(sql,arr)
            console.log(result)
            res.json({
                status:0,
                message:'注册成功'
            })
        }
        catch (e) {
            res.json({
                status:1,
                message:'注册失败'
            })
        }
    }else {
        res.json({
            status:2,
            message:'用户名已被注册'
        })
    }


})

module.exports=router