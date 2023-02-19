const sqlquery=require('../../public/javascripts/mysql')
const bcryrpt=require('bcryptjs')
const express=require('express')
const router=express.Router()

router.post('/setPassword',async (req,res)=>{
    var password=req.body.password
    var phone=req.body.phone
    console.log(password)
    console.log(phone)
    var hashedPassword=await bcryrpt.hash(password,8)
    var arr=[hashedPassword,phone]

    try {
        var sql='UPDATE userdb.jd_user SET password=? WHERE phone=?;'
        var result=await sqlquery(sql,arr)
        console.log(result)
        res.json({
            status:0,
            message:'修改密码成功'
        })
    }
    catch (e) {
        res.json({
            status:1,
            message:'修改密码失败'
        })
    }
})




module.exports=router