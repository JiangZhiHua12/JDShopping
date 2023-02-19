<template>
    <div class="content">
        <div class="content_one">
            <span class="span">欢迎注册</span>
           <div class="black">
               <span style="font-size: 16px;color: #999">已有账号？</span>
               <span @click="backto" style="font-size: 16px;color:#EE2222;text-decoration: #E4393C;cursor: pointer">请登入</span>
           </div>
        </div>
    </div>
    <div class="registered">
        <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
                <el-input type="password" v-model.number="ruleForm2.checkpass" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item  prop="phone">
                <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item  prop="email">
                <el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm">提交</el-button>
                <el-button class="btn2" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "@/axios";
    import {ElMessage} from "element-plus";
    //import {ElMessage} from "element-plus";
    export default {
        name: "RegistrationPassword",
        data(){
            //校验邮箱
            var email=function (rule,value,callback) {
                var regEmail =/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
                console.log(regEmail)
                if (!regEmail){
                    return  callback(new Error('邮箱格式不正确'))
                }else {
                    callback()
                }
            }
            //校验手机号码
            var phone=function (rule,value,callback) {
                var regphone=/^1[34578]\d{9}$/.test(value)
                if (!regphone){
                    return  callback(new Error('手机号码格式不正确'))
                }else {
                    callback()
                }
            }
            //密码校验
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            //确认密码校验
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
               ruleForm2:{
                   username:'',
                   password:'',
                   checkpass: '',
                   phone:'',
                   email:''
               },
               rules:{
                   username:[
                       {required: true, message: '请输入用户名', trigger: 'blur'}
                   ],
                   password:[
                       { validator: validatePass, trigger: 'blur' }
                   ],
                   checkPass: [
                       { validator: validatePass2, trigger: 'blur' }
                   ],
                   email:[
                       {required:true,message:'请填写您的邮箱',trigger:'blur'},
                       {validator:email,trigger:'blur'}
                   ],
                   phone:[
                       {required:true,message:'请填写您的手机号码',trigger:'blur'},
                       {validator:phone,trigger:'blur'}
                   ]

               }
            }
        },
        created() {
            this.phone=this.$store.phone
            console.log(this.phone)
        },
        methods:{
            backto:function(){

                this.$router.push({name:'login'})
            },
            submitForm:function () {
                this.$refs.ruleForm2.validate(async (valid)=>{
                    if (valid==true){
                        console.log('通过预验证，调用接口')
                        var res=await axios.post('/Registration',this.ruleForm2)
                        console.log(res.data.status)
                        if (res.data.status==0){
                            ElMessage({
                                showClose: true,
                                message:res.data.message,
                                type: 'success',
                            })
                            this.$router.push({name:'login'})
                        }else if (res.data.status==1) {
                            ElMessage({
                                showClose: true,
                                message:res.data.message,
                                type: 'error',
                            })
                        }else if (res.data.status==2){
                            this.$message({
                                showClose: true,
                                message:res.data.message,
                                type: 'warning'
                            });
                        }
                    }
                })
            },
            resetForm:function () {
                this.$refs.ruleForm2.resetFields();
                console.log('hahaha3123')
            }

        }
    }
</script>

<style scoped>
    .black{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-left: 1000px;
    }
    .btn2{
        width: 190px;
        height: 50px;
        outline: none;
        background-color: #E4393C;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }
    .btn{
        width: 200px;
        height: 50px;
        outline: none;
        background-color: #E4393C;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }
    .el-input{
        width: 400px;
        height: 50px;
    }
    .registered{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }
    .content_one{
        width: 100%;
        height: 100px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #666;
        background-color: #ffffff;
        box-shadow: 0 0 .25rem rgba(95, 95, 95, .48);
        display: flex;
        align-items: center;

    }
    .span{
        margin-left: 150px;
        font-size: 24px;
        color: #333;
    }
</style>