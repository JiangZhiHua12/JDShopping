var express=require('express')
var router=express.Router()
const sqlquery=require('../../public/javascripts/mysql')

router.post('/addShippingAddress',async (req,res)=>{
      var name=req.body.name

      var phone=req.body.phone
      var email=req.body.Email
      var address=req.body.address
      var detailAddress=req.body.detailAddress
      var alias=req.body.alias
      var user_id=req.user.id
      var arr=[address,user_id,detailAddress,alias,name,phone,email]
      var sql='insert into user_adress (address,user_id,detailAddress,alias,name,phone,Email) values(?,?,?,?,?,?,?)'
      var result=await sqlquery(sql,arr)
    console.log('hah')
    console.log(result)

      res.json({
          status:200,
          msg:'添加收货地址成功',
      })

})

router.get('/getShippingAddress',async (req,res)=>{
      var user_id=req.user.id
      var sql='select * from user_adress where user_id=?'
      var result=await  sqlquery(sql,[user_id])
    console.log('11111')
      result.forEach((item,index)=>{
          var a=item.isdefault
          if (a==1){
              var cc=result[0]
              result[0]=item
              result[index]=cc
          }

      })

    console.log(result)
     res.json({
         status:200,
         msg:'获取收货人地址成功',
         data:result
     })
})

router.post('/updata',async (req,res)=>{
    var isdefault=req.body.isdefault
    var id=req.body.id
    var user_id=req.user.id
    var sql='UPDATE user_adress SET isdefault=? where user_id=?'
    var result=await sqlquery(sql,[0,user_id])
    console.log(result)
    var sql2='UPDATE user_adress SET isdefault=? where id=? and user_id=?'
    var result2=await sqlquery(sql2,[isdefault,id,user_id])
    console.log(result2)
    res.json({
        status:200,
        msg:'修改默认地址成功'
    })
})

router.post('/deleteAdress',async (req,res)=> {
      var id=req.body.id
      var sql='delete from user_adress where id=?'
      var result=await sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:200,
        msg: '删除收货人地址成功！！'
    })
})
router.post('/editAddress',async (req,res)=> {
     var id=req.body.id
     var address=req.body.address
     var  detail_address=req.body.detailAddress
     var  address_alise=req.body.alias
     var  name=req.body.name
     var phone=req.body.phone
     var email=req.body.Email

     var arr=[address,detail_address,address_alise,name,phone,email,id]
     var sql='update user_adress set address=?,detailAddress=?,alias=?,name=?,phone=?,Email=? where id=?'
     var result=await sqlquery(sql,arr)
    console.log(result)
    res.json({
        status:200,
        msg:'编辑成功！！'
    })
})

router.get('/getAddress',async (req,res)=>{
    var id=req.query.id
    console.log('eqweqwe')
    console.log(id)
    var user_id=req.user.id
    console.log(user_id)
    var sql='select * from user_adress where id=? and user_id=? '
    var result=await sqlquery(sql,[id,user_id])
    console.log(result)
    console.log('123123123123')
    res.json({
        status:200,
        msg:'获取地址成功',
        data:result
    })
})

module.exports=router