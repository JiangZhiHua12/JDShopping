const sqlquery=require('../../public/javascripts/mysql')
const bcryrpt=require('bcryptjs')
const express=require('express')
const router=express.Router()
const {createToken}=require('../token/token')

router.post('/gg',async (req,res)=>{
    res.json('你好呀')
})

router.post('/Login',async (req,res)=>{
   const username=req.body.username
    console.log(req.body)
   var   password=req.body.password

   try {
      var sql='SELECT * FROM userdb.jd_user where username=?'
      const result=await sqlquery(sql,[username])
     // console.log(result[0].password)

      var ismatch=await bcryrpt.compare(password,result[0].password)
      console.log(ismatch)
      if (ismatch===true){
         var token=createToken({username:result[0].username,id:result[0].id})
        console.log(token)
         res.json({
            status:0,
            message:'登入成功',
            data:result,
            token:token
         })
      }
      else{
         res.json({
            status:1,
            message:'账号或密码不正确'

         })
      }
   }
    catch (e) {
      res.json({
         status:2,
         message:'该账号未注册'
      })
    }

})



module.exports=router
