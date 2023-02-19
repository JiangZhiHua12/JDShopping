const express=require('express')

const router=express.Router()

const sqlquery=require('../../public/javascripts/mysql')
router.post('/ProductCat',async (req,res)=> {


           var sql='select * from product_cat_1'
           var result=await sqlquery(sql)
           //console.log(result)
//获取所有的二级商品分类
           var sql2='select * from product_cat_2'
           var result2=await sqlquery(sql2)
           //console.log(result2)
           //获取所有三级商品的权限
           var sql3='select * from product_cat_3 limit 0,10000'
           var result3=await sqlquery(sql3)


           //通过循环将各级商品添加到指定级别商品的分类下
           result.forEach((item,index)=>{
               //首先过滤二级商品
               var data=result2.filter(item2=>{
                   return item2.first_cat_id==result[index].id
               })
               //将过滤出来的二级商品添加到一级商品的children下
               result[index].children=data
               //将三级商品添加到二级商品下
               for (var i=0;i<result[index].children.length;i++){
                   //过滤出三级商品
                   var data2=result3.filter(item3=>{
                       return  item3.second_cat_id==result[index].children[i].id
                   })
                   result[index].children[i].children=data2

               }

           })



           res.json({
               msg:'获取商品数据成功！',
               data:result,
               status:'ok'
           })





})

module.exports=router