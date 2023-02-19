const crypto=require('crypto')

module.exports={
    MD5_SUFFIX:'JiangZhiHua',
    md5:secret=>{
        var md5=crypto.createHash("md5")
        return md5.update(secret).digest('hex')
    },
    secretKey:'JiangZhiHua'
}