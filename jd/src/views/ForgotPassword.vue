<template>
    <div class="content">
        <div class="content_one">
            <span>找回密码</span>
        </div>
    </div>
    <div ref="verify_" class="verify">
        <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
           <el-form-item prop="phone">
                <el-input type="text" class="input" v-model="ruleForm2.phone" placeholder="请输入账号绑定的手机号"></el-input>
            </el-form-item>
            <div style="display: flex;flex-direction: row">
                <el-form-item  prop="code">
                    <el-input class="code" type="text" v-model="ruleForm2.code" placeholder="请输入验证码" ></el-input>
                </el-form-item>
                <div class="getCode">
              <span ref="code" @click="Code">
                  <p v-if="this.show==true">获取验证码</p>
                  <p v-if="this.show==false">{{this.num}}</p>
              </span>
                </div>
            </div>

            <el-form-item>
                <el-button class="btn" type="danger" @click="submitForm">下一步</el-button>
            </el-form-item>
        </el-form>

    </div>
    <div ref="setPassword_" class="setPassword">

          <span class="span" >设置密码</span>
        <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="pass">
                <el-input ref="input_" class="ipt" type="password" v-model="ruleForm.pass" auto-complete="off">
                    <template v-slot:append>
                        <i style="font-size: 20px" @click="eye" ref="eye_" class="fa fa-eye-slash" aria-hidden="true"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="success" class="btn2" type="danger" >完成</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import axios from "@/axios";
    import {ElMessage} from "element-plus";

    export default {
        name: "ForgotPassword",
        data(){
            var phone=function (rule,value,callback) {
                    var regphone=/^1[34578]\d{9}$/.test(value)
                    if (!regphone){
                        return  callback(new Error('手机号码格式不正确'))
                    }else {
                        callback()
                    }
                }
            return{
                ruleForm:{
                    pass:''
                },
                phone:'',
                iseye:false,
                show:true,
                num:60,
                ruleForm2:{
                    phone:'',
                    code:'',
                },
                rules2:{
                  pass:[
                      {required:true,message:'请填写您的密码',trigger:'blur'},
                  ]
                },
                rules:{
                    phone:[
                        {required:true,message:'请填写您的手机号码',trigger:'blur'},
                        {validator:phone,trigger:'blur'}
                    ],
                    code:[
                        {required:true,message:'请输入验证码',trigger:'blur'},
                    ]
                }
            }
        },
        created() {
            console.log(this.pass)
        },
        methods:{
            success:async function(){
                this.$refs.ruleForm.validate(async (valid)=>{
                    if (valid==true){
                        var res=await axios.post('/setPassword',{password:this.ruleForm.pass,phone:this.phone})
                        console.log(res.data)
                        if (res.data.status==0){
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'success',
                            })
                            this.$router.push({name:'login'})
                        }else if (res.data.status==1&&this.phone==''){
                            ElMessage({
                                showClose: true,
                                message: res.data.message,
                                type: 'success',
                            })
                        }
                    }

                })
            },
            eye:function(){
                if (this.iseye==false){
                    this.$refs.eye_.className='fa fa-eye'
                    this.$refs.input_.input.type='text'
                    //console.log(this.$refs.input_.input.type)
                    this.iseye=true
                }
                else {
                    this.$refs.eye_.className='fa fa-eye-slash'
                    this.$refs.input_.input.type='password'
                    this.iseye=false
                }

            },
            submitForm:function(){
                this.$refs.ruleForm2.validate((valid)=>{
                    if (valid==true){
                        //var data = Qs.stringify(this.ruleForm);
                        axios.post('/verifyCode',{phone:this.ruleForm2.phone,code:this.ruleForm2.code}).then(res=>{
                            console.log(res.data)
                            if (res.data.status===2){
                                ElMessage({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'error',
                                })
                            }else if (res.data.status===0){
                                ElMessage({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'success',
                                })
                                console.log('haha')
                                this.phone=this.ruleForm2.phone
                                this.$refs.setPassword_.style.display='flex'
                                this.$refs.verify_.style.display='none'

                            }else if (res.data.status===1){
                                ElMessage({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'error',
                                })
                            }

                        })
                    }
                })

            },
            Code:function(){
                if (this.show==false){
                    console.log('不能调用')
                }else {
                    console.log('调用')
                    this.getCode()
                }
            },

           async getCode () {
               var regphone=/^1[34578]\d{9}$/.test(this.ruleForm2.phone)
                //调用验证码接口
               if (this.ruleForm2.phone==''){
                   ElMessage({
                       showClose: true,
                       message: '请输入手机号码',
                       type: 'error',
                   })
               }else if(!regphone){
                   ElMessage({
                       showClose: true,
                       message: '请输入正确的手机格式',
                       type: 'error',
                   })
               }else {
                   this.show=false
                   var that=this
                   var result=await axios.get('/getCode',{params:{phone:this.ruleForm2.phone}})
                   console.log(result)
                   var clear=setInterval(function () {
                       that.num--
                       if (that.num==-1){
                           that.show=true
                           that.num=60
                           clearInterval(clear)

                       }
                   },1000)
               }

            }
        }
    }
</script>

<style scoped>
    .span{
        font: 700 16px/30px Microsoft YaHei;
        color: #666666;
        margin-right: 230px;
        margin-bottom: 20px;
    }
    .ipt{
        width: 402px;
        height: 50px;
    }
    .setPassword{
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;

    }
    .getCode{
        width: 100px;
        height: 49px;
        border: 1px solid #DCDFE6;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 2px;
        background-color: #F5F7FA;
    }
    .btn2{
        width: 402px;
        height: 50px;
        outline: none;
        background-color: #E4393C;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 20px;
        margin-top: 20px;
    }
    .btn{
        width: 402px;
        height: 50px;
        outline: none;
        background-color: #E4393C;
        color: #ffffff;
        border: none;
        cursor: pointer;
        font-size: 20px;
    }
    .verify{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }
    .code{
        width: 300px;
        height: 50px;
    }
    .input{
        width: 402px;
        height: 50px;
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
.content_one span{
  margin-left: 150px;
    font-size: 24px;
    color: #333;
}
</style>