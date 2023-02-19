import axios from "axios";
import swal from "sweetalert";
//import QS from 'qs'
import router from "@/router";
//import {Message} from 'element-plus'
//import {Message} from 'element-plus'

axios.defaults.timeout=10000

//设置post请求头

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios请求拦截器

axios.interceptors.request.use(
    request => {
        var token=window.localStorage.getItem('token_jzh')
        //console.log('----我的token')
       // console.log(token)
        if (token) {
            // 请求统一设置header,给每个请求携带上token
            request.headers['Authorization'] =`Bearer ${token}`//这里不能使用request.headers.Authorization
        }
        return request

    }, error => {

        return Promise.reject(error)

    })

// axios响应拦截器
axios.interceptors.response.use(
    response=>{
        console.log(response)
        if (response.data.token){ //如果响应携带token就把token保存到本地
           // console.log(response.data.token)
            window.localStorage.setItem('token_jzh',response.data.token)
        } else if (response.data.status===401){
            window.localStorage.setItem('token_jzh','');
            swal('登入权限过期,麻烦你重新登入一下呢！').then(()=>{
                router.replace({
                    path:'/login'
                })
            })
        }
        return response//没有token就正常返回请求就好了
    },error => {
        if (error.response.status===401){
            console.log('----token报错')
            console.log(error.response)
            window.localStorage.removeItem('token_jzh');
            swal('登入失效！！请重新登入').then(()=>{

            })
        }
        return Promise.reject(error.message)
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