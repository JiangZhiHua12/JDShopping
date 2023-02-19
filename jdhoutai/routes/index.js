var express = require('express');
var router = express.Router();
var vartoken=require('../public/javascripts/token')

var LoginRouter=require('./login/Login')

router.use('/api',(req,res,next)=>{
    if (req.url=='/login' || req.url=='/registered'){

        next()
        return
    }
    var token=String(req.headers.authorization)

    var result=vartoken.getToken(token)
    console.log(result)
    if(result.status==401) {
        res.json({
            msg: result.msg,
            status: result.status
        })
        return
    } if (result.status==403){
        res.json({
            msg: result.msg,
            status: result.status
        })
        return
    }
    next()
    return

})

router.use('/api',LoginRouter)




module.exports = router;
