const  express=require('express')
const  router=express.Router()
const sqlquery=require('../../public/javascripts/mysql')

router.post('/upDataAdress',async (req,res)=> {
    var Address=req.body.Address
    var username=req.body.username
    var arr=[Address,username]
    var sql='UPDATE user SET Address?  WHERE name=?;'
    var result=await sqlquery(sql,arr)
    console.log(result)
    res.json({
        status:200,
        msg:'添加地址成功！！'
    })


})

router.get('/getUser',async (req,res)=>{
    var username=req.query.username
    var sql='select * from user where name=?'
    var result=await sqlquery(sql,[username])
    console.log(result)
    res.json({
        status:200,
        msg:'获取用户信息成功！',
        data:result
    })
})

module.exports=router