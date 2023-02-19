import axios from "axios";
//import QS from 'qs'
import router from "@/router";
//import {Message} from 'element-plus'
//import {Message} from 'element-plus'

axios.defaults.timeout=10000

//设置post请求头

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios请求拦截器
var token=window.localStorage['token']
axios.interceptors.request.use(
    require => {
        if (token) {
            // 请求统一设置header
            require.headers.Authorization =token
        }
        return require

    }, error => {

        return Promise.reject(error)

    })

// axios响应拦截器
axios.interceptors.response.use(
    response=>{
        if (response.data.status==200){
            return response
        }
        else if (response.data.status==401){
            //用户未登入
            router.push({path:'/'})
            return response
        }else if (response.data.status==403){
            //token无效或过期
            window.localStorage.clear()
            router.push({path:'/'})
            return response
        }
        else {
            return response
        }
    },error => {
        var status=error.response
        return status
    }

)

/*
 export function post(url,params) {
         return new Promise((resolve, reject) => {
             axios.post(url,QS.stringify(params)).then(res=>{
                 resolve(res.data)
             })
                 .catch(err=>{
                     reject(err.data)
                 })
         })
}
 export function get(url,params) {
    return new Promise((resolve, reject) => {
        axios.get(url,{params:params}).then(res=>{
            resolve(res.data)
        }).catch(err=>{
                reject(err.data)
            })
    })
}


*/


export default axios