const express=require('express')
const router=express.Router()
const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const AlipayFormData = require('alipay-sdk/lib/form').default
const axios=require('axios')
const sqlquery=require('../../public/javascripts/mysql')

  router.post('/pay',async (req,res)=>{
      var orderNum=req.body.order
      var title=req.body.title
      var price=req.body.totalPrice
      console.log(orderNum)
      console.log(title)
      console.log(price)
      const alipaySdk = new AlipaySdk({
          appId: '2021000121673460', // 开放平台上创建应用时生成的 appId
          signType: 'RSA2', // 签名算法,默认 RSA2
          gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
          alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiJFtAFYBf2ZJW1pjFiEoAQFSypQ3q62F3r7Eu06Or30dTKP5SLWBo3JmZ9Q7ziWYmijlGygogvS/ogcspgQMjAmp67wJ+OlsbYMJZUqsj5Qg1EtIlgeGUNXwfLKaoqASEq77nkdf5IGiY8qbukUZsb7bV6dbCXRCEaR49tw+CZWMpZZ0tu8LTWzgQdsre0K1Y0YRdodB445OJCCLgz0UUE//xRFtKKdEtIE/nANv9BdB5AFK3MEBKUEInnozZE/eVLcB10jfnhKSwY++/Yn/N1xThdaQ1A6VocxXdUJktolyCwWqrjRfFwFl46puKa8UNAKwDuHycxPfcXJIGvWATQIDAQAB', // 支付宝公钥，需要对结果验签时候必填
          privateKey:'MIIEogIBAAKCAQEAxprc5pzSwCqjVLHNdYzkEZ+AApMY/mPY7OMNNVo8YV8k5LlJoJBdq2UVNrtRw6q87ljd7Eal+JQkiPD2U4vmcEol6c8x++llQBBi1miLf/qvdrsn6w8hQ8NuIc7miQ0kiHxLGdSbviipy0RiTYvPYvvsq630RLQByHwbM0TA4iveEFRpdIxPIwXA82sD/MmFf/tRlUZNcXqNXysDEzIqvdV3hZZIfbufMnZnv+sPwgkEerRvjYsW+qTd+WQ1A8i54M5JVYLCVSIeamrLR5/Npj+IkKg3wv/qGJrcVDN6UnWpgFCcArRS0/FJDmQIhc8La9nIMVjLVO6PcEsAXQhAgwIDAQABAoIBACt1leMs6/07F1SgN8qCUyH8GiH2GGEKblyf7rL/FPllvYgDd7YYATdRPkwkv2amxQMPFTjv2L/Fgx0oRW7QzVNDFnrMaS6rywkyzL4IUIZnz9+WYszQGcJfUIk7Yj0ZUCZBtJlpac85zLX7N9uqPW52nDqRLUOfdEhvx+/3GpIjDhWJ4NLPx33oj6AnuxhqwTvQFo+w8U9kiwvRmYFAO1maeUb2zxzhaQ4xTEoFkveMpXJD2DbK7DKaCyYNL/btLD9jr+s7hXdmy4v6dPI4HC2Bj03J01kUdxhBhrZkdJpRz/iblm2rsVXIuL1aw5EqFNt098kvjdexPFbslnEw3PkCgYEA+hAkHpG+gfQ6iSgeTh0TkFXb8meWI3OoB47zNYTesBjzYe56XoLfuG3qamKxfTP+t9RqgGiRdhshqaFp9vPmz5JDtLgnqBsx9mYT+UAnD9wUT/VeL5kNBPLtbkq3X1iftueacK5VGr2lfVNTLcyWjZRTGtXPIoQODMGuNLy0KGcCgYEAy1H24KSQmmcKho61D/uPlZ3F3FE8+NeI5c8iqWSGIRbGb3Y54mGHMzHS5x2/3XkSgssAwTPg0NjU++W5w77azreTyT2Yf0OOGiac4vm5tiyafUFIVWgONDIuC9cyHQhlCRA2qNWzHki0v/cyU4WetJ3jetGiIe4UZwvHGHXoxYUCgYAX7Xl3T1zaVINRYnxb3x5jHkQYkt7j74oxhvUwttEUKp8HTOl6p60+mY3nth/jqhkCgBncxaS9l2UGNULNdZMtY4KFBWYOCOQj/qqEnCXgt59d802a4ltDkPc1KYMYZYOK3eiCRbww/dqa/mEkLcJuM7YsCC90zwwFHndL5o6amwKBgEnyubPipqVBrNZbuQbjG8ny5C/JbD+lRKkwuQ6a/R2zxuBrQ4pOpnm8OVTNwSawDkd7xf5++9l5w50KZJIJLFPa+OlMedZvn5NrT8xNv3m+p0G/KKvHeMMLLSwpTJS6pOSy/O5TKx5smzDmm2s9Qge3FTFqZWmpycngwrzmxY5xAoGAUOE9jjo/5DMWZ+0b+7g0RAclHLCc+zvpOwRF3YO1UjoCpH4JGc0Re18GMNT2M6GOFGuSVS3KTYYr2kvrmVVIzRRcE/EL9jt4fDhm2hOQOPLW9mft+I75Uh4unHO8+UIypKSNgZaBWLkjnVh0iNUkMeffgH7GNJjR+cucMT6n6MI=', // 应用私钥字符串

      });

      const formData = new AlipayFormData()

      formData.setMethod("get")
      formData.addField('notifyUrl', 'http://127.0.0.1:3000/api/PaySuccess'); // 当支付完成后，支付宝主动向我们的服务器发送回调的地址
      formData.addField('returnUrl', 'http://localhost:8080/home')
      var date = new Date();
      var dateStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      console.log(dateStr)

      console.log(typeof dateStr)
      //formData.addField('timestamp',dateStr)
      formData.addField('bizContent', {
          body: "测试商品",
          subject:title,
          outTradeNo:orderNum,
          totalAmount: price,
          quitUrl: "http://www.taobao.com/product/113714.html",
          productCode: 'FAST_INSTANT_TRADE_PAY'
      });
      console.log('haha')
      const result = await alipaySdk.exec(
          'alipay.trade.page.pay',
          {},
          {
              formData: formData,
              validateSign: true
          },
      );

      console.log(result)

      res.json({
          data:result
      })

  })

router.post('/PaySuccess', async (req, res) => {

    const alipaySdk = new AlipaySdk({
        appId: '2021000121673460', // 开放平台上创建应用时生成的 appId
        signType: 'RSA2', // 签名算法,默认 RSA2
        gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
        alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiJFtAFYBf2ZJW1pjFiEoAQFSypQ3q62F3r7Eu06Or30dTKP5SLWBo3JmZ9Q7ziWYmijlGygogvS/ogcspgQMjAmp67wJ+OlsbYMJZUqsj5Qg1EtIlgeGUNXwfLKaoqASEq77nkdf5IGiY8qbukUZsb7bV6dbCXRCEaR49tw+CZWMpZZ0tu8LTWzgQdsre0K1Y0YRdodB445OJCCLgz0UUE//xRFtKKdEtIE/nANv9BdB5AFK3MEBKUEInnozZE/eVLcB10jfnhKSwY++/Yn/N1xThdaQ1A6VocxXdUJktolyCwWqrjRfFwFl46puKa8UNAKwDuHycxPfcXJIGvWATQIDAQAB', // 支付宝公钥，需要对结果验签时候必填
        privateKey:'MIIEogIBAAKCAQEAxprc5pzSwCqjVLHNdYzkEZ+AApMY/mPY7OMNNVo8YV8k5LlJoJBdq2UVNrtRw6q87ljd7Eal+JQkiPD2U4vmcEol6c8x++llQBBi1miLf/qvdrsn6w8hQ8NuIc7miQ0kiHxLGdSbviipy0RiTYvPYvvsq630RLQByHwbM0TA4iveEFRpdIxPIwXA82sD/MmFf/tRlUZNcXqNXysDEzIqvdV3hZZIfbufMnZnv+sPwgkEerRvjYsW+qTd+WQ1A8i54M5JVYLCVSIeamrLR5/Npj+IkKg3wv/qGJrcVDN6UnWpgFCcArRS0/FJDmQIhc8La9nIMVjLVO6PcEsAXQhAgwIDAQABAoIBACt1leMs6/07F1SgN8qCUyH8GiH2GGEKblyf7rL/FPllvYgDd7YYATdRPkwkv2amxQMPFTjv2L/Fgx0oRW7QzVNDFnrMaS6rywkyzL4IUIZnz9+WYszQGcJfUIk7Yj0ZUCZBtJlpac85zLX7N9uqPW52nDqRLUOfdEhvx+/3GpIjDhWJ4NLPx33oj6AnuxhqwTvQFo+w8U9kiwvRmYFAO1maeUb2zxzhaQ4xTEoFkveMpXJD2DbK7DKaCyYNL/btLD9jr+s7hXdmy4v6dPI4HC2Bj03J01kUdxhBhrZkdJpRz/iblm2rsVXIuL1aw5EqFNt098kvjdexPFbslnEw3PkCgYEA+hAkHpG+gfQ6iSgeTh0TkFXb8meWI3OoB47zNYTesBjzYe56XoLfuG3qamKxfTP+t9RqgGiRdhshqaFp9vPmz5JDtLgnqBsx9mYT+UAnD9wUT/VeL5kNBPLtbkq3X1iftueacK5VGr2lfVNTLcyWjZRTGtXPIoQODMGuNLy0KGcCgYEAy1H24KSQmmcKho61D/uPlZ3F3FE8+NeI5c8iqWSGIRbGb3Y54mGHMzHS5x2/3XkSgssAwTPg0NjU++W5w77azreTyT2Yf0OOGiac4vm5tiyafUFIVWgONDIuC9cyHQhlCRA2qNWzHki0v/cyU4WetJ3jetGiIe4UZwvHGHXoxYUCgYAX7Xl3T1zaVINRYnxb3x5jHkQYkt7j74oxhvUwttEUKp8HTOl6p60+mY3nth/jqhkCgBncxaS9l2UGNULNdZMtY4KFBWYOCOQj/qqEnCXgt59d802a4ltDkPc1KYMYZYOK3eiCRbww/dqa/mEkLcJuM7YsCC90zwwFHndL5o6amwKBgEnyubPipqVBrNZbuQbjG8ny5C/JbD+lRKkwuQ6a/R2zxuBrQ4pOpnm8OVTNwSawDkd7xf5++9l5w50KZJIJLFPa+OlMedZvn5NrT8xNv3m+p0G/KKvHeMMLLSwpTJS6pOSy/O5TKx5smzDmm2s9Qge3FTFqZWmpycngwrzmxY5xAoGAUOE9jjo/5DMWZ+0b+7g0RAclHLCc+zvpOwRF3YO1UjoCpH4JGc0Re18GMNT2M6GOFGuSVS3KTYYr2kvrmVVIzRRcE/EL9jt4fDhm2hOQOPLW9mft+I75Uh4unHO8+UIypKSNgZaBWLkjnVh0iNUkMeffgH7GNJjR+cucMT6n6MI=', // 应用私钥字符串
    });


    let orderId=req.body.order
    console.log('********')
    console.log(orderId)
    console.log("******")
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        out_trade_no:orderId,
    });
    // 通过该接口主动查询订单状态
    const result =await alipaySdk.exec(
        'alipay.trade.query',
        {},
        {formData: formData },
    );
    console.log('------')
    //console.log(result)
    var result3=await axios.get(result)
    console.log(result3)




    axios({
        method: 'GET',
        url: result
    })
        .then(data=> {
            var r=data.data.alipay_trade_query_response
            //console.log(r)
            if(r.code === '10000') { // 接口调用成功
                switch(r.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send(
                            {
                                "success": true,
                                "message": "success",
                                "code": 200,
                                "timestamp": (new Date()).getTime(),
                                "result": {
                                    "status":0,
                                    "message":'交易创建，等待买家付款'
                                }
                            }
                        )
                        break;
                    case 'TRADE_CLOSED':
                        res.send(
                            {
                                "success": true,
                                "message": "success",
                                "code": 200,
                                "timestamp": (new Date()).getTime(),
                                "result": {
                                    "status":1,
                                    "message":'未付款交易超时关闭，或支付完成后全额退款'
                                }
                            }
                        )
                        break;
                    case 'TRADE_SUCCESS':
                        res.send(
                            {
                                "success": true,
                                "message": "success",
                                "code": 200,
                                "timestamp": (new Date()).getTime(),
                                "result": {
                                    "status":2,
                                    "message":'交易支付成功'
                                }
                            }
                        )
                        break;
                    case 'TRADE_FINISHED':
                        res.send(
                            {
                                "success": true,
                                "message": "success",
                                "code": 200,
                                "timestamp": (new Date()).getTime(),
                                "result": {
                                    "status":3,
                                    "message":'交易结束，不可退款'
                                }
                            }
                        )
                        break;
                }
            } else if(r.code === '40004') {
                res.send('交易不存在');
            }
        })
        .catch(err => {
            res.json({
                msg: '查询失败',
                err
            });
        });

})


router.post('/createOrder',async (req,res)=>{
    //创建订单之前先查询数据库里面是否已经有相同的订单


      var orderNum=req.body.orderNum
      var createTime=req.body.time
      var orderPrice=req.body.orderPrice
      var status=req.body.status
     var user_id=req.user.id
     var product_info=req.body.product_info
    var consignee=req.body.consignee
    var pay=req.body.pay
    console.log('------123')
    console.log(consignee)
    console.log(product_info)
      var arr=[orderNum,createTime,orderPrice,status,user_id,product_info,consignee,pay]
       var sql2='SELECT * FROM `userdb`.`order` WHERE orderNum=?'
       var result2=await sqlquery(sql2,[orderNum])
    console.log('___1')
     console.log(result2[0])
       if (result2[0]==undefined){
           var sql='INSERT INTO `userdb`.`order` (`orderNum`, `time`, `orderPrice`, `status`,`user_id`,`productInfo`,`consignee`,`pay`) VALUES (?,?,?,?,?,?,?,?);'
            var result=await sqlquery(sql,arr)
           console.log('____2')
           console.log(result)

           res.json({
               status:200,
               msg:'创建订单成功！！'
           })
       }else {
           console.log('___3')
           console.log('订单已经创建')
           res.json({
               status:200,
               msg:'创建订单成功！！'
           })
       }



})

router.post('/upDataOrder',async (req,res)=>{
    var status=req.body.status
    var orderNum=req.body.orderNum
    console.log(req.body)
    var sql='UPDATE `userdb`.`order` SET status=? WHERE orderNum=?'
    var result=await sqlquery(sql,[status,orderNum])
    console.log(result)
    //console.log('jjjj')
    res.json({
        status:200,
        msg:'交易完成'
    })
})

module.exports=router