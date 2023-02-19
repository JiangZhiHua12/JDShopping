var mysql = require('mysql')
var options= {
    host     :  '127.0.0.1',
    port     :'3306',
    user     :  'root',
    password :  'root',
    database :  'userdb'
}
var con=mysql.createConnection(options)

con.connect(function (err) {
    if (err){
        console.log(err)
    }
    else {
        console.log("数据库连接成功")
    }
})
//用promise封装mysql方便后续直接调用

function sqlquery(strSql,arr){
    return new Promise(function (resolve,reject) {
        con.query(strSql,arr,function (err,results) {
            if (err){
                reject(err)
            }else {
                resolve(results)
            }
        })
    })
}
module.export=sqlquery