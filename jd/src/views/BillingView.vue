<template>
    <div class="container">
        <el-container>

            <el-header class="header">
                <div>
                    <span @click="home" style="cursor: pointer">首页</span>
                    <span style="margin-left: 10px">欢迎您！{{username}}</span>
                </div>
            </el-header>
            <el-main>
                <div class="content_one">
                    <div class="logo">
                        <a class="logo_one"></a>
                        <a class="logo_tow"></a>
                    </div>
                    <div class="process">
                        <el-steps :space="1000" align-center :active="1" finish-status="success">
                            <el-step title="1.我的购物车"></el-step>
                            <el-step title="2.填写核对订单信息"></el-step>
                            <el-step title="3.成功提交订单"></el-step>
                        </el-steps>
                    </div>
                </div>
                <div class="content_tow">
                    <div class="title">
                        <span>核对并填写订单信息</span>
                    </div>
                    <div class="main_info">
                          <div class="consignee">
                              <div class="consignee_one">
                                  <span style="font-size: 12px" ><h3 style="color: #333333;">收货人信息</h3></span>
                                  <span><a class="addAdress" @click="isAddAddress=true" >新增收获地址</a></span>
                              </div>

                              <el-dialog
                                      title="收货地址"
                                      v-model="isAddAddress"
                                      width="40%"
                                      append-to-body="true"
                              >
                                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                      <el-form-item label="所在地区" prop="address">
                                          <SelectAddress v-model="ruleForm.address"></SelectAddress>
                                      </el-form-item>
                                      <el-form-item label="收货人" prop="name">
                                          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                                      </el-form-item>
                                      <el-form-item label="详细地址" prop="detailAddress">
                                          <el-input v-model="ruleForm.detailAddress"></el-input>
                                      </el-form-item>
                                      <el-form-item label="手机号码" prop="phone">
                                          <el-input v-model="ruleForm.phone"></el-input>
                                      </el-form-item>
                                      <el-form-item label="邮箱地址" prop="Email">
                                          <el-input v-model="ruleForm.Email"></el-input>
                                      </el-form-item>
                                      <el-form-item label="地址别名" prop="alias">
                                          <el-input v-model="ruleForm.alias"></el-input>
                                      </el-form-item>
                                      <el-form-item>
                                          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                          <el-button @click="resetForm">重置</el-button>
                                      </el-form-item>
                                  </el-form>
                              </el-dialog>

                              <div style="margin-top: 20px;margin-left: 20px">
                                  <ul class="ul" ref="ul">
                                      <li @mouseover="mouseover_(index)" @mouseout="mouseout_(index)"  ref="li_" v-for="(item,index) in shippingAddress" :key="index"  class="consignee_tow" >
                                          <div class="alias" ref="alias_" @click="li(item,index)">{{item.alias}}</div>
                                          <div class="text"  @click="li(item,index)">
                                              <span  style="margin-left: 10px">{{item.name}}</span>
                                              <span  style="margin-left: 10px" limit="45">{{item.address[0]}} {{item.address[1]}} {{item.address[2]}} {{item.address[3]}} {{item.detailAddress}} {{item.phone}}</span>
                                              <span v-if="item.isdefault==1" style="width: 54px;height: 20px;color: #ffffff;background-color: #999999;font-size: 12px;font-weight: bold;margin-left: 10px;display: flex;align-items: center;justify-content: center"><a style="color: #ffffff">默认地址</a></span>
                                          </div>
                                          <div ref="edit_delete" class="edit_delete" style="position: absolute;left:1140px;">
                                              <span @click="edit_(item.id)" class="edit_"><a>编辑</a></span>
                                              <span @click='delete_(item.id,item)' class="delete_"><a>删除</a></span>
                                          </div>
                                      </li>
                                  </ul>
                                  <el-dialog
                                          title="收货地址"
                                          v-model="isAddAddress2"
                                          width="40%"
                                          append-to-body="true"
                                  >
                                      <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                                          <el-form-item label="所在地区" prop="address">
                                              <SelectAddress v-model="ruleForm2.address"></SelectAddress>
                                          </el-form-item>
                                          <el-form-item label="收货人" prop="name">
                                              <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
                                          </el-form-item>
                                          <el-form-item label="详细地址" prop="detailAddress">
                                              <el-input v-model="ruleForm2.detailAddress"></el-input>
                                          </el-form-item>
                                          <el-form-item label="手机号码" prop="phone">
                                              <el-input v-model="ruleForm2.phone"></el-input>
                                          </el-form-item>
                                          <el-form-item label="邮箱地址" prop="Email">
                                              <el-input v-model="ruleForm2.Email"></el-input>
                                          </el-form-item>
                                          <el-form-item label="地址别名" prop="alias">
                                              <el-input v-model="ruleForm2.alias"></el-input>
                                          </el-form-item>
                                          <el-form-item>
                                              <el-button type="primary" @click="submitForm2">提交</el-button>
                                              <el-button @click="resetForm">重置</el-button>
                                          </el-form-item>
                                      </el-form>
                                  </el-dialog>
                                  <div @click="unfold" style="margin-top: 10px;font-size: 12px;cursor: pointer;margin-bottom: 20px"><span ref="span_" style="color: #666666">更多地址</span><i style="color:#666666" ref="i_" class="fa fa-angle-double-down"></i></div>
                              </div>
                          </div>

                          <div class="pay">
                              <div class="pay_oen">
                                  <a ><h3 style="color: #333333">支付方式</h3></a>
                              </div>
                              <div class="pay_tow">
                                  <span class="pay_tow_" ref="pay_tow_" @click="selectPay"><a style="color: #666666">在线支付</a></span>
                              </div>
                          </div>

                        <div class="DeliveryList">
                            <div class="DeliveryList_one"><h3 style="color: #333333">送货清单</h3></div>
                            <div class="DeliveryList_tow">
                                <ul style="margin-top: 10px">
                                    <li style="margin-bottom: 15px" v-for="(item) in shoppingCar" :key="item.id">
                                        <div style="margin-top: 15px;margin-left: 15px">
                                            <span>
                                            <h4 style="color: #666666">商家:东东自营店</h4>
                                            </span>
                                            <div class="conent">
                                                <el-image class="imgs" :src="item.img"></el-image>
                                                <span  class="title_">
                                               {{item.title}}
                                            </span>
                                                <div class="price_">
                                                    <strong style="color: #E4393C">￥ {{item.price}}</strong>
                                                    <span style="margin-left: 100px">x{{item.num}}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div class="billing">
                        <div class="billing_one">
                            <div>
                                <span style="color: #666666">应付总额:</span>
                                <span style="font-size: 18px;color: #E4393C;margin-left: 30px">￥ {{totalPrice}}</span>
                            </div>

                        </div>
                        <div class="billing_tow">
                            <div class="hhsq">
                                <div style="margin-right: 20px">
                                    <span style="margin-right: 10px" >寄送至:</span>
                                    <span>{{defaultAddress.detailAddress}}</span>
                                </div>
                                <div>
                                    <span style="margin-right: 10px">收货人:</span>
                                    <span style="margin-right: 5px">{{defaultAddress.name}}</span>
                                    <span>{{defaultAddress.phone}}</span>
                                </div>
                            </div>


                        </div>


                    </div>
                    <div class="submitOrder">
                        <button @click="submitOrder">
                            <a style="color: #ffffff;font-size: 16px">提交订单</a>
                        </button>
                    </div>
                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
    import axios from '@/axios'
    import SelectAddress from "@/components/SelectAddress";
    export default {
        name: "BillingView",
        components: {SelectAddress},
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
            return{
                username:'',
                title:'',
                totalPrice:0,
                OrderNum:null,
                pay:false,
                isAddAddress:false,
                isAddAddress2:false,
                unfolds:false,
                shoppingCar:[],
                shippingAddress:[],
                defaultAddress:[],
                ruleForm: {
                    address:'',
                    name:'',
                    phone:'',
                    Email:'',
                    detailAddress:'',
                    alias:'',
                    user_id:null,
                },
                ruleForm2: {
                    address:'',
                    name:'',
                    phone:'',
                    Email:'',
                    detailAddress:'',
                    alias:'',
                    user_id:null,
                },
                rules:{
                    address: [
                        { required: true, message: '请选您所在的地址', trigger: 'blur'}
                    ],
                    name:[
                        {required: true, message: '请填写收货人姓名', trigger: 'blur'}
                    ],
                    detailAddress:[
                        {required: true, message: '请填写您的详细地址', trigger: 'blur'}
                    ],
                    phone:[
                        {required:true,message:'请填写您的手机号码',trigger:'blur'},
                        {validator:phone,trigger:'blur'}
                    ],
                    Email:[
                        {validator:email,trigger:'blur'}
                    ]

                }


            }
        },
        async created() {
            this.username=this.$store.state.username
            this.ruleForm.user_id=this.$store.state.user_id
            this.ruleForm2.user_id=this.$store.state.user_id
            this.shoppingCar=JSON.parse(this.$route.params.checkedProduct)
           // console.log(this.shoppingCar)
            console.log(this.username)
            //console.log(this.user_id)
            console.log(this.shoppingCar)

            //this.shippingAddress.Adress=JSON.parse(this.shippingAddress.Adress)


        },
         async mounted(){

            console.log('12345')
             //console.log(this.$refs)
             var result=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
             console.log(result.data.data)
             this.shippingAddress=result.data.data
             //等dom全部渲染完毕在调用
             this.updateData()
             this.settlement()
        },

        methods:{

            setTimeDateFmt(s) {  // 个位数补齐十位数
                return s < 10 ? '0' + s : s;
            },
            createordernum() {
                const now = new Date()
                let month = now.getMonth() + 1
                let day = now.getDate()
                let hour = now.getHours()
                let minutes = now.getMinutes()
                let seconds = now.getSeconds()
                month = this.setTimeDateFmt(month)
                day = this.setTimeDateFmt(day)
                hour = this.setTimeDateFmt(hour)
                minutes = this.setTimeDateFmt(minutes)
                seconds = this.setTimeDateFmt(seconds)
                let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
                return orderCode;
                //基于年月日时分秒+随机数生成订单编号
            },


    submitOrder:async function(){
                var address=JSON.stringify(this.defaultAddress)
                console.log(address)
                if (this.pay==true && address!=='[]'){
                    console.log('调用支付接口')
                    console.log('----')
                    this.shoppingCar.forEach(async (item)=>{
                        this.title=item.title+','+this.title
                    })
                    console.log(this.title)
                    this.OrderNum=this.createordernum()
                    console.log(this.OrderNum)
                    var result=await axios.post('/pay',{totalPrice:this.totalPrice,title:this.title,order:this.OrderNum})
                    console.log(result.data.data)
                    window.open(result.data.data)

                    //删除提交订单的商品
                  // this.$router.push({name:'pay',params:{data:JSON.stringify(result.data)}})
                    var that=this
                    var clean=setInterval(async function () {
                        var result2=await axios.post('/PaySuccess',{order:that.OrderNum})
                        console.log(result2)
                        console.log(result2.data.result.message)
                        if (result2.data.result.status===2){
                            console.log('交易完成')
                            var result8=await axios.post('/upDataOrder',{status:'true',orderNum:that.OrderNum})
                            console.log(result8)
                            clearInterval(clean)
                        }else if (result2.data.result.status===0){
                            console.log('交易创建')
                            //删除正在交易的商品
                            that.shoppingCar.forEach(async (item)=>{
                                var result2=await axios.post('/deleteShoppingCar',{id:item.id})
                                console.log(result2.data)
                                console.log('删除成功？？？')
                            })

                            var date = new Date();
                            var dateStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                            console.log(dateStr)
                            //获取收货人信息
                            var consignee=await axios.get('/getShippingAddress',{params:{user_id:that.$store.state.user_id}})
                            console.log(consignee.data.data)
                            this.shippingAddress=consignee.data.data
                            var username=this.shippingAddress.filter((item)=>{
                                return item.isdefault===1
                            })
                            console.log(username)
                            var result4=await axios.post('/createOrder',{orderNum:that.OrderNum,time:dateStr,orderPrice:that.totalPrice,status:'false',user_id:that.$store.state.user_id,product_info:JSON.stringify(that.shoppingCar),consignee:username[0].name,pay:result.data.data})
                            console.log(result4)

                        }
                    },5000)


                }else if(address=='[]'){
            this.$message({
                message: '请选择您的收货人地址！',
                type: 'warning'
            });
        }else {
                    this.$message({
                        message: '请选择您的支付方式！',
                        type: 'warning'
                    });

                }
            },
            selectPay:function(){
                if (this.pay==false){
                    this.$refs.pay_tow_.className='pay_tow_hover'
                    this.pay=true
                }else {
                    this.$refs.pay_tow_.className='pay_tow_'
                    this.pay=false
                }

            },
            settlement(){
                this.shoppingCar.forEach((item)=>{
                     this.totalPrice=(item.price *item.num) + this.totalPrice
                })
            },
            edit_:async function(id){
                console.log(id)
                var result=await axios.get('/getAddress',{params:{user_id:this.ruleForm.user_id,id:id}})
                console.log(result.data)
                this.ruleForm2=result.data.data[0]
                this.ruleForm2.address=JSON.parse(this.ruleForm2.address)
                console.log(this.ruleForm2)
                this.isAddAddress2=true
            },
            delete_:async function(id,item){
                this.$confirm('确定要删除收货人地址？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if (JSON.stringify(item.isdefault)=='1'){
                        var result3=await axios.post('/deleteAdress',{id:id})
                        var result2=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                        console.log(result2.data.data)
                        this.shippingAddress=result2.data.data
                        console.log(this.shippingAddress)
                        this.$refs.alias_[0].className='alias_'
                        this.$refs.li_[0].style.display='flex'
                        var result4=await axios.post('/updata',{id:this.shippingAddress[0].id,user_id:this.shippingAddress[0].user_id,isdefault:1})
                        console.log(result4.data)
                        var result5=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                        console.log(result5.data.data)
                        this.shippingAddress=result5.data.data
                        console.log(this.shippingAddress)
                        this.updateData_()
                        console.log(result3.data)
                        this.$message({
                            message: '删除收货人地址成功',
                            type: 'success'
                        });
                    }else {
                        console.log(id)
                        var result=await axios.post('/deleteAdress',{id:id})
                        console.log(result.data)
                        var result6=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                        console.log(result6.data.data)
                        this.shippingAddress=result6.data.data
                        this.updateData_()
                        this.$message({
                            message: '删除收货人地址成功',
                            type: 'success'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

                //var result3=await axios.post('/deleteAdress',{id:id})


                //this.shippingAddress


            },
            async updateData_(){
                this.shippingAddress.forEach((item,index)=>{
                    this.shippingAddress[index].address=JSON.parse(item.address)
                })

            },
            updateData(){
                this.$nextTick(function () {
                    this.shippingAddress.forEach((item,index)=>{
                        this.shippingAddress[index].address=JSON.parse(item.address)
                        //console.log(item.isdefault)
                        var a=JSON.stringify(item.isdefault)
                        if (a=='1') {
                            this.$refs.li_[index].style.display='flex'
                            this.$refs.alias_[index].className='alias_'
                            console.log('haha')
                            this.defaultAddress=this.shippingAddress[index]
                        }
                        else {
                            this.$refs.li_[index].style.display='none'

                            console.log('wohenhao')
                        }
                    })
                })
            },
            li:async function(item,index){
                console.log(item)
                var result=await axios.post('/updata',{id:item.id,user_id:item.user_id,isdefault:1})
                console.log(result.data)
                var result2=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                console.log(result2.data.data)
                var defaults=result2.data.data.filter(item=>{
                    return item.isdefault==1
                })
                console.log(result)
                console.log('---31')
                console.log(this.shippingAddress)
                this.shippingAddress.forEach((item,index2)=>{
                    //this.shippingAddress[index2].Adress=JSON.parse(item.Adress)

                    this.$refs.alias_[index2].className='alias'
                    if (item.id==defaults[0].id){
                        item.isdefault=1
                    }
                    else {
                        item.isdefault=0
                    }

                })
                this.$refs.alias_[index].className='alias_'

                console.log('-------')
                console.log(index)
               console.log(this.shippingAddress)
                this.defaultAddress=this.shippingAddress[index]
               this.updateData_()
                console.log('dasds')
                console.log(this.shippingAddress)
            },
            unfold:async function(){
                var result=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                console.log(result)
                this.shippingAddress=result.data.data
                if (this.unfolds==false){
                    this.$refs.i_.className='fa fa-angle-double-up'
                    this.$refs.span_.innerText='收起地址'
                   // var one=this.shippingAddress[0]
                    this.shippingAddress.forEach((item,index)=>{
                        this.shippingAddress[index].address=JSON.parse(item.address)


                        this.$refs.li_[index].style.display='flex'


                    })
                    console.log('展开')
                    this.unfolds=true
                }else {
                    this.unfolds=false
                    this.$refs.i_.className='fa fa-angle-double-down'
                    this.$refs.span_.innerText='更多地址'
                    this.shippingAddress.forEach((item,index)=>{
                        var a=JSON.stringify(item.isdefault)
                        this.shippingAddress[index].address=JSON.parse(item.address)
                        if (a=='1') {
                            this.$refs.li_[index].style.display='flex'
                            //console.log('haha')
                            this.$refs.alias_[index].className='alias_'
                        }
                        else {
                            this.$refs.li_[index].style.display='none'
                            console.log('wohenhao')
                            this.$refs.alias_[index].className='alias'
                        }
                    })
                    console.log('收缩')
                }

            },
            submitForm2:function(){
                this.$refs.ruleForm2.validate(async (valid) => {
                    if (valid) {
                        console.log('通过预验证')
                        this.ruleForm2.address=JSON.stringify(this.ruleForm2.address)
                        var result=await axios.post('/editAddress',this.ruleForm2)
                        console.log(result)
                        var result2=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm2.user_id}})
                        console.log(result2.data.data)
                        this.shippingAddress=result2.data.data
                        if ( this.unfolds==true){
                            this.updateData_()
                        }else {
                            this.updateData()
                        }
                        this.isAddAddress2=false
                        this.$message({
                            message: '编辑收货人地址成功',
                            type: 'success'
                        });


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        console.log('通过预验证')
                        this.ruleForm.address=JSON.stringify(this.ruleForm.address)
                        var result=await axios.post('/addShippingAddress',this.ruleForm)
                        console.log(result)
                        var result2=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                        console.log('------312323')
                        console.log(result2.data.data[0].id)
                        //过滤收货人地址里面是否有默认地址
                        this.shippingAddress=result2.data.data
                        var exitdefault=result2.data.data.filter(item=>{
                            return item.isdefault==1
                        })
                        var isexit=JSON.stringify(exitdefault)
                        if (isexit=='[]'){
                            var result4=await axios.post('/updata',{id:result2.data.data[0].id,isdefault:1})
                            console.log(result4)
                            var result5=await axios.get('/getShippingAddress',{params:{user_id:this.ruleForm.user_id}})
                            this.shippingAddress=result5.data.data
                            this.updateData_()
                            this.$refs.alias_[0].className='alias_'

                        }else {
                            if ( this.unfolds==true){
                                this.updateData_()
                            }else {
                                this.updateData()
                            }
                        }


                        this.isAddAddress=false
                        this.$message({
                            message: '添加收货人地址成功',
                            type: 'success'
                        });

                        this.ruleForm.name=''
                        this.ruleForm.phone=''
                        this.ruleForm.Email=''
                        this.ruleForm.detailAddress=''
                        this.ruleForm.address=''
                        this.ruleForm.alias=''

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm:function(){
                this.$refs.ruleForm.resetFields();
            },
            mouseover_:function(index){
                //console.log('niha')
                this.$refs.edit_delete[index].style.display='block'
               // console.log(this.$refs.edit_delete)
            },
            mouseout_:function(index){
               // console.log('wohao')
                this.$refs.edit_delete[index].style.display='none'
            },
            //xiugai_:function(){
                //this.$refs.text_.style.backgroundColor='#fff'
            //},
            //xiugai_bgd:function(){
                //this.$refs.text_.style.backgroundColor='#FFF3F3'
           // },
            home:function(){
                this.$router.push({name:'home',params:{username:this.username,user_id:this.ruleForm.user_id}})
            },
        },

        watch:{

        },
    }
</script>

<style scoped>
    .submitOrder button{
        width: 135px;
        height: 36px;
        background-color: #E4393C;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        cursor: pointer;
    }
    .submitOrder{
        width: 950px;
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        height: 37px;
    }
    .billing_tow span{
        color: #999999;
    }
    .billing_tow .hhsq{
        display: flex;
        flex-direction: row;
        margin-right: 20px;
    }
    .billing_tow{
    width: 950px;
      display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .billing_one div{
        display: flex;
        flex-direction: row;
        margin-right: 20px;

    }
    .billing_one{
        width: 950px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 20px;
    }
    .billing{
        width: 950px;
        height: 100px;
        background-color:#F4F4F4 ;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 100px;
    }
    .price_{
        display: flex;
        flex-direction: row;
        margin-left: 100px;
    }
    .title_{
        display: flex;
        flex-direction: column;
        color: #666666;
        margin-left: 10px;
        line-height: 20px;
        width:240px ;
    }
    .imgs{
        width: 80px;
        height: 80px;
    }
    .conent{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }
    .edit_delete{
        display: none;

    }
    .delete_ a:hover{
        cursor: pointer;
        color: #E4393C;
        margin-left: 10px;
    }
    .delete_ a{
        cursor: pointer;
        color: #008CD8;
        margin-left: 10px;
    }
    .edit_ a:hover{
        cursor: pointer;
        color:#E4393C;;
    }
    .edit_ a{
        cursor: pointer;
        color:#008CD8;;
    }
    .text{
        height: 30px;
        display: flex;
        align-items: center;
        width: 757px;
    }
    .text span{
        color: #666666;

    }
    .alias_{
        border: 1px solid #E4393C;
        height: 30px;
        width: 143px;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 999;
    }
    .alias{
      border: 1px solid #E6E6E6;
        height: 30px;
        width: 143px;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 999;
    }
    .consignee_tow:hover{
        width: 900px;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;

        margin-bottom: 10px;
        background-color: #fff3f3;
        line-height: 10px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .consignee_tow{
        width: 900px;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        line-height: 10px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }


    .addAdress:hover{
        font-size: 12px;
        color:#E4393C;
    }
    .addAdress{
        font-size: 12px;
        color:#008CD8;
        cursor: pointer;

    }
    .consignee_one{
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
    }
    .pay_tow_hover{
        display: flex;
        justify-content: center;
        align-items: center;
        border:1px solid #E4393C;
    }
    .pay_tow_{
        display: flex;
        justify-content: center;
        align-items: center;
        border:1px solid #E6E6E6;
    }
    .pay_tow span{
        display: flex;
        width: 100px;
        height: 30px;
        flex-direction: row;
        margin-left: 20px;

        cursor: pointer;

    }
    .pay_tow{
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .pay_oen{
        font-size: 12px;
    }
    .pay{
        width: 950px;
        border-bottom:1px solid #E6E6E6 ;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        margin-left: 20px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .DeliveryList_tow ul li{
        display: flex;
        flex-direction: column;
        width: 950px;
        height: 190px;
        background-color: #F3FBFE;
    }
    .DeliveryList_tow{
        margin-bottom: 20px;
    }
    .DeliveryList_one{
        margin-top: 10px;
    }
    .DeliveryList{
        width: 950px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        margin-left: 20px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .consignee{
        width: 950px;
        border-bottom: 1px solid #E6E6E6;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        margin-left: 20px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .main_info{
        width: 1000px;
        border: 1px solid #F0F0F0;
        display: flex;
        justify-content: center;
        margin-top: 10px;
        flex-direction: column;

    }
    .content_tow{
        margin-left: 250px;
        display: flex;
        flex-direction: column;
        margin-top: 50px;
    }
    .title span{
        font-size: 16px;
        color: #666666;

    }
    .title{
        width: 1000px;
        display: flex;
        align-items: center;
    }
.process{
    width: 450px;
    margin-top: 20px;
}
    .logo_tow{
        display: block;
        width: 100px;
        height: 40px;
        line-height: 99em;
        background: url(//misc.360buyimg.com/user/purchase/2.0.0/widget/header-2017/i/purchase-icon.png) #fff no-repeat;
        margin-top: 20px;
        margin-left: 20px;
    }

  .logo{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
  }
.content_one{
    display: flex;
    flex-direction: row;
    margin-left: 250px;
    justify-content: space-between;
    width: 1000px;
}
    .header{
        background-color:#E3E4E5 ;
        height: 30px;
    }
</style>