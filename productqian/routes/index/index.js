var express=require('express')
var router=express.Router()
const {jwtAuth}=require('../token/token')

const LoginRouter=require('../Login/Login')
const ProductCat=require('../Home/home')
const getImg=require('../Home/img')
const  getPosition=require('../Position/position')
const  getShoppingCar=require('../ShoppingCar/ShoppingCar')
const  User=require('../User/User')
const  addShippingAddress=require('../addShippingAddress/addShippingAddress')
const  pay=require('../pay/formData')
const order=require('../Order/Order')
const Captcha=require('../Captcha/Captcha_one')
const Registration=require('../Registration/Registration')
const setPassword=require('../setPassword/setPassword')

//校验token
router.use(jwtAuth)

router.use((err,req,res,next)=>{
    console.log(err.status)
    if (err.status===401){
        res.json({
            status:401,
            message:'无效token'
        })
        return
    }
    next()
})

router.use('/api',LoginRouter)
router.use('/api',ProductCat)
router.use('/api',getImg)
router.use('/api',getPosition)
router.use('/api',getShoppingCar)
router.use('/api',User)
router.use('/api',addShippingAddress)
router.use('/api',pay)
router.use('/api',order)
router.use('/api',Captcha)
router.use('/api',Registration)
router.use('/api',setPassword)


module.exports=router