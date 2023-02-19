const  express=require('express')
const  router=express.Router()
const sqlquery=require('../../public/javascripts/mysql')

router.get('/getShoppingCar',async (req,res)=>{
    console.log('----nimade')
    console.log(req.user)
         var user_id=req.user.id
         //console.log(user_id)
       var sql='SELECT * FROM shopcar where userid=?'
       var result=await sqlquery(sql,[user_id])
       //console.log(result)
    res.json({
        status:200,
        msg:'获取购物车数据成功！',
        data:result
    })

})

router.get('/getProductNum',async (req,res)=>{
    var id=req.query.id
    //console.log(req)
    var sql='SELECT * FROM shopcar where id=?'
    var result=await sqlquery(sql,[id])
    console.log(result[0].num)
    res.json({
        status:200,
        msg:'获取购物车数据成功！',
        data:result[0]
    })

})

router.post('/addProduct',async (req,res)=>{

        var  id=req.body.id
         var title=req.body.title
         var price=req.body.price
         var num=req.body.num
         var img=req.body.img
         var user_id=req.user.id
        console.log(user_id)
    console.log("caonima")
         var ischecked=req.body.ischecked
    //console.log( user_id)
       var product=[id,title,price,img,num,user_id,ischecked]
         //console.log(req)
    console.log( user_id)
    //console.log(typeof user_id)
    var sql='SELECT * FROM shopcar where userid=? and id=?'
    var result2=await sqlquery(sql,[user_id,id])
    if (result2)
      if (result2[0]==undefined){
          var sql2='insert into shopcar (id,title,price,img,num,userid,ischecked) values (?,?,?,?,?,?,?)'
          var result=await sqlquery(sql2,product)
          console.log(result)
          res.json({
              status:200,
              msg:'添加商品数据成功！'
          })
      }else {
          console.log('----已经有了')
          res.json({
              status:200,
              msg:'购物车已有该商品！'
          })
      }


})
router.post('/upDataProduct',async (req,res)=>{
     var num=req.body.num
     var id=req.body.id
   // var Address=req.body.Address
    var arr=[num,id]
    var sql='UPDATE shopcar SET num=?  WHERE id=?;'
    var result=await sqlquery(sql,arr)
    console.log(result)
    res.json({
        status:200,
        msg:'修改商品数据成功！！'
    })
})

router.post('/deleteShoppingCar',async (req,res)=> {
   var id=req.body.id
    var sql='delete from shopcar where id=?'
    var result=sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:200,
        msg:'删除商品成功！'
    })
})
module.exports=router