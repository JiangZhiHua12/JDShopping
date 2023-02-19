var md5 = require('md5')
var moment = require('moment')
var Base64 = require('js-base64').Base64;
var request = require('request');

/*
 生成指定长度的随机数
 */
function randomCode(length) {
    var chars = ['0','1','2','3','4','5','6','7','8','9'];
    var result = ""; //统一改名: alt + shift + R
    for(var i = 0; i < length ; i ++) {
        var index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}
// console.log(randomCode(6));
exports.randomCode = randomCode;


/*
向指定号码发送指定验证码
 */
function sendCode(phone, code, callback) {
    var ACCOUNT_SID = '8aaf0708842397dd0184b35eedda3415';
    var AUTH_TOKEN = '374f2d18a057431ab1ff188099c832dd';
    var Rest_URL = 'https://app.cloopen.com:8883';
    var AppID = '8aaf0708842397dd0184b35eee9d341c';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */

    var sigParameter = '';
    var time = moment((new Date()).getTime()).format('YYYYMMDDHHmmss');
    sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    var url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

    var body = {
        to : phone,
        appId : AppID,
        templateId : '1',
        "datas":[code,"1"]
    }


    var authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    var headers = {
        'Accept' :'application/json',
        'Content-Type' :'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length+'',
        'Authorization' : authorization
    }

    request({
        method : 'POST',
        url : url,
        headers : headers,
        body : body,
        json : true
    }, function (error, response, body) {
        callback(body.statusCode==='000000');
    });
}
exports.sendCode = sendCode;

