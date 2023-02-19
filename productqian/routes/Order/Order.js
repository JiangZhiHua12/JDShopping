const express=require('express')
const router=express.Router()
const  sqlquery=require('../../public/javascripts/mysql')

router.get('/getOrder',async (req,res)=>{
     var user_id=req.user.id
     var pageNum=req.query.pageNum
     var sql2="select * from `userdb`.`order` where user_id=?"
    var result2=await sqlquery(sql2,[user_id])
    console.log(result2)
    var total=0
    result2.forEach(item=>{
        total++

    })
    console.log(total)
     var sql='select * from `userdb`.`order` where user_id=? limit ?,4'
     var result=await sqlquery(sql,[user_id,(pageNum-1)*4])
    console.log(result)
     res.json({
         status:200,
         msg:'订单查询成功',
         data:result,
         total:total

     })
})
router.post('/deleteOrder',async (req,res)=>{
    var id=req.body.id
    var sql='delete from `userdb`.`order` where id=?'
    var result=await sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:200,
        msg:'删除订单成功'
    })

})


module.exports=router