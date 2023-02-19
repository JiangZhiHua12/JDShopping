<template>
    <div class="login">

        <el-container class="container">
            <!-- 这里是登入头部 -->
            <el-header class="header">
                <div class="LogImg">

                    <img src="https://misc.360buyimg.com/user/passport/1.0.0/css/i/l-icon.png">
                </div>
            </el-header>



            <!-- 这里是登入主要内容部分 -->
            <el-main class="main">

                <div class="mask">
                    <i class="fa fa-exclamation-circle" style="margin: 0px 5px"> </i>
                    <p>
                        依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！ 新版<a href="https://about.jd.com/privacy/" target="_blank">
                        《京东隐私政策》
                    </a>
                        已上线，将更有利于保护您的个人隐私。
                    </p>
                </div>

                <!-- 登入 -->
                    <div class="bg">
                        <div class="login_">
                            <div class="mask_login">
                                <i class="fa fa-exclamation-circle" style="margin: 0px 5px"></i>
                                <p>购物平台不会以任何理由要求您转账汇款，谨防诈骗。</p>
                            </div>
                            <div class="Login_mode">
                                <span class="Scan" @click="clickScan"><a :class="{Active:isActive==true,disActive:isActive==false}" >扫码登入</a></span>
                                <span class="User"  @click="clickUser"><a :class="{Active:isActive==false,disActive:isActive==true}" >账号登入</a></span>
                            </div>
                            <!-- 扫码登入 -->
                            <div ref="Scan" class="qrcode-login">
                                <div style="display: flex;justify-content: center;">
                                    <img ref="img" src="https://qr.m.jd.com/show?appid=133&size=147&t=1653851212136">
                                </div>
                                    <div style="display: flex;flex-direction: row;font-size: 12px;height: 40px;justify-content: center;align-items: center;margin: 10px 0px">

                                            <p>打开</p>
                                        <a style="color: red" href="javascript:;">手机东东</a>&nbsp;
                                        <p>扫描二维码</p>
                                    </div>
                                <div class="mianshuru" style="display: flex;flex-direction: row;font-size: 13px;height: 30px;justify-content: center;border-bottom: 1px solid #f4f4f4">
                                    <span><a><i class="fa fa-pencil"></i></a><p>免输入</p></span>
                                    <span><a><i class="fa fa-bolt" ></i></a><p>更快</p></span>
                                    <span><a><i class="fa fa-shield"></i></a><p>更安全</p></span>
                                </div>
                                <div class="footer_">
                                    <span class="-qq" style="width: 60px;border-right: 1px solid #f4f4f4"><b><i style="margin: 0px 5px;color: #00B7FF" class="fa fa-qq"></i></b><a >QQ</a></span>
                                    <span class="wx"><b><i style="margin: 0px 5px;color: #42b983" class="fa fa-weixin"></i></b><a style="">微信</a></span>
                                    <span style="position: relative;left: 60px;width: 85px"><i class="fa fa-chevron-circle-right" style="color: orangered;margin: 0px 5px"></i><a>立即注册</a></span>
                                </div>
                            </div>
                            <!-- 账号密码登入 -->
                            <div ref="User" class="login-box">
                                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item class="username" prop="username">
                                        <el-input class="input_one"  type="text" v-model="ruleForm.username" auto-comlete="off">
                                            <template v-slot:prepend>
                                                <i class="fa fa-user-o"></i>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item class="password"  prop="password">
                                        <el-input class="input_tow"   type="password" v-model="ruleForm.password" auto-complete="off">
                                            <template v-slot:prepend>
                                                <i class="fa fa-lock"></i>
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                     <el-form-item class="forgpassword">
                                         <a @click="ForgotPassword" class="active">忘记密码？</a>
                                     </el-form-item>
                                    <el-form-item >
                                        <el-button class="btn_one" size="medium" type="danger" @click="submitForm">登入</el-button>

                                    </el-form-item>
                                    <el-form-item class="footer_tow">
                                        <span class="-qq" style="width: 60px;border-right: 1px solid #f4f4f4;margin-left: -80px"><b><i style="margin: 0px 5px;color: #00B7FF" class="fa fa-qq"></i></b><a >QQ</a></span>
                                        <span class="wx"><b><i style="margin: 0px 5px;color: #42b983" class="fa fa-weixin"></i></b><a style="">微信</a></span>
                                        <span style="position: relative;left: 80px;width: 85px"><i class="fa fa-chevron-circle-right" style="color: orangered;margin: 10px 5px"></i><a  @click="Registration">立即注册</a></span>
                                    </el-form-item>
                                </el-form>

                            </div>

                        </div>
                    </div>


            </el-main>
            <!-- 这里是登入尾部 -->
            <el-footer class="footer">
                <div class="links">
                    <a href="https://about.jd.com/" target="_blank"> 关于我们 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 联系我们 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 人才招聘 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 商家入住 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 广告服务 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 手机东东 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 友情链接 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 销售联盟 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 东东社区 </a>|
                    <a href="https://about.jd.com/" target="_blank"> 东东公益 </a>|
                    <a href="https://about.jd.com/" target="_blank"> English Site </a>
                </div>
            </el-footer>
        </el-container>

    </div>
</template>

<script>

    import axios from '@/axios'
    import { ElMessage } from 'element-plus'
    //import Qs from 'qs'

   // import bus from 'vue3-eventbus'
    export default {
        name: "LoginView",
        data(){


            return{
               isActive:true,
                ruleForm: {
                    password: '',
                    username: '',
                },
                rules:{
                   username:[{required:true,message:'用户名不能为空', trigger: 'blur'}],
                    password:[{required:true,message:'密码不能为空',trigger: 'blur'}]
               }
            }
        },
        methods:{
            Registration:function(){
                this.$router.push({path:'/RegistrationPassword'})
                console.log('hahah')
            },
            ForgotPassword:function(){
                this.$router.push({path:'/ForgotPassword'})
                console.log('hahah')
            },
             submitForm: function(){
                 console.log(this.ruleForm)
                 this.$refs.ruleForm.validate((valid)=>{
                     if (valid==true){
                         //var data = Qs.stringify(this.ruleForm);
                         axios.post('/Login',this.ruleForm).then(res=>{

                             if (res.data.status==0){
                                 ElMessage({
                                     showClose: true,
                                     message: res.data.message,
                                     type: 'success',
                                 })

                                 this.$store.state.token=true
                                 var user={
                                     username:res.data.data[0].username,
                                     user_id:res.data.data[0].id
                                 }
                                 this.$store.state.token=true
                                 this.$store.state.username=res.data.data[0].username
                                 this.$store.state.user_id=res.data.data[0].id
                                 window.localStorage.setItem('user',JSON.stringify(user))
                                 window.localStorage.setItem('token',this.$store.state.token)
                                 console.log(window.localStorage.getItem('token'))

                                 this.$router.push({name:'home',params:{username:this.ruleForm.username,user_id:res.data.data[0].id}})
                             }else if (res.data.status==1){
                                 ElMessage({
                                     showClose: true,
                                     message:res.data.message,
                                     type: 'error',
                                 })
                             }else if(res.data.status==2){
                                 ElMessage({
                                     showClose: true,
                                     message:res.data.message,
                                     type:'warning',
                                 })
                             }


                         })
                     }


                 })
            },


             clickScan:function () {
                this.isActive=true
                 this.$refs.Scan.style.display='flex'
                 this.$refs.User.style.display='none'


             },
            clickUser:function () {
                this.isActive=false
                this.$refs.Scan.style.display='none'
                this.$refs.User.style.display='flex'
            }
        },
        created() {
            console.log('sss')
        }
    }
</script>

<style scoped>
    .button{}
    .forgpassword{
        display: flex;
     margin-top: -20px;
        margin-left: 160px;
        cursor: pointer;
    }
    .active{
        color: #A3A3A3;
        font-size: 12px;
    }
    .active:hover{
        color: red;
        font-size:12px ;
    }
    .btn_one{
width: 300px;
        margin: 0px -80px;
        background-color:#E4393C ;
    }
    .demo-ruleForm{
        width: 100%;
        justify-content: center;
        align-items: center;
        align-content: center;
    }


.password{
    margin: 30px -80px;
    width: 400px;
}
.username{
    margin: 20px -80px;
    width: 400px;
}

    .login-box{
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .footer_tow a{
        color: #666666;
        cursor: pointer;
    }
    .footer_tow a:hover{
        color:red;
    }
    .footer_tow span{
        display: flex;
        width: 60px;
        flex-direction: row;
    }
    .footer_ a{
        color: #666666;
        cursor: pointer;
    }
    .footer_ a:hover{
        color:red;
    }
    .footer_ span{
        margin: 0px 15px;
        display: flex;
        width: 60px;
        flex-direction: row;
    }
    .footer_{
        font-size: 15px;
        display: flex;
      position: relative;top: 20px;
        flex-direction: row;
        align-items: center;
        background-color: #ffff;
    }
    .footer_tow{
        font-size: 15px;
        display: flex;
        position: relative;top: 20px;
        flex-direction: row;
        align-items: center;
        background-color: #ffff;
    }
    .mianshuru a{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid white;
    }
    .mianshuru span{
        display: flex;
        flex-direction: row;
        margin: 0px 10px;
    }
    p{
        color: #666666;
    }
    .disActive{
        color: #666666;

    }
    .Active{
        color: red;
    }
    .login-box{
        display: none;
    }

    .qrcode-login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 40px 0px;
    }

    .Login_mode a:hover{
        color: red;
    }
    .User a{
        width: 173px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .Scan a{
        width: 173px;
        border-right: 1px solid #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .User{
        width:173px;
        height:55px ;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Scan{
        width:173px;
        height:55px ;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Login_mode{
        display: flex;
        flex-direction: row;
border-bottom: #f4f4f4 1px solid;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
    }
.mask_login{
    color: #999999;
    width: 346px;
    height: 30px;
    font-size: 12px;
    opacity: 40%;
    background-color: #fff8f0;
    display: flex;
    justify-content: center;
    align-items: center;

}
a{
    border: none;
}
  .login_{
      display: flex;
      flex-direction: column;
      width: 346px;
      height: auto;
      background-color: #ffff;
      position: relative;left: 950px;
      top: 40px;
      z-index: 100;
  }
    .links a:hover{
        margin: 0px 10px;
        color: red;
    }
    .links{
        font-size: 12px;
        margin: 20px 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .links a{
        margin: 0px 10px;
    }
    .mask a{
        color: white;
    }
    .mask{
        color: #999999;
        width: 100vw;
        height: 30px;
        font-size: 12px;
        opacity: 85%;
        background-color: black;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    .LogImg>img{
        margin: 20px 20px;
        width: 110px;
        height: 40px;
    }
    .LogImg{
        display: flex;
        flex-direction: row;
        position: absolute;
        padding: 0px 10px;
        left: 100px;
    }
    .container{
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }
    .footer{
        background-color: black;height: 120px;
    }
    .bg{
        position: fixed;
        width: 100vw;
        height: 511px;
        background:url("https://img1.360buyimg.com/pop/jfs/t1/130243/21/28822/91560/6316a412E0be70d94/3828ae196202fe29.jpg")no-repeat;
        background-size:100vw 511px;


    }
    .main{
        margin: 0;
        padding: 0;
        position: relative;
    }
.header{
    background-color: black;
    height: 80px;
}
</style>