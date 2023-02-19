const express=require('express')
const router=express.Router()

router.get('/getImg',(req,res)=>{

    const result=[
        {url:'https://imgcps.jd.com/ling4/10037526821477/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6f7/6fdb7218/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100016034400/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6f9/e69ce071/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100035259546/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6f8/3dcd5e82/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100038004389/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e7/c3b8fda3/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100016034400/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6fa/832c39b7/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/10037526821477/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e1/ad9584ee/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100016034400/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e7/2a099eb5/cr/s/q.jpg'},
        {url:'https://imgcps.jd.com/ling4/100038004353/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e6/9a77d934/cr/s/q.jpg'},
    ]

    res.json({
        msg:'获取轮播图片成功',
        data:result,
        status:200
    })
})


module.exports=router