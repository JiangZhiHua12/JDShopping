<template>
    <div class="container">
        <el-container>
            <el-header class="header">
                <div>
                    <span @click="home" style="cursor: pointer">首页</span>
                    <span style="margin-left: 10px">欢迎您！{{username}}</span>
                </div>
            </el-header>
            <el-main class="main">
                <div class="content_one">

                    <div class="logo">
                        <a class="Logo_Img"></a>
                    </div>

                    <div class="search">
                        <div class="search_">
                            <input class="iput" type="text">
                            <button class="btn"><span>搜索</span></button>
                        </div>
                    </div>
                    </div>
                <div class="content_tow">
                    <div class="content_tow_tito">
                        <div class="-product-hunt">
                            <span>
                            全部商品
                           </span>
                            <span style="margin-left: 10px">{{total}}</span>
                        </div>
                        <div class="-address-">
                            <span style="font-size: 12px;width: 60px">配送至:</span>
                            <SelectAddress :Address="Address"></SelectAddress>
                        </div>
                    </div>
                </div>
                <div class="content_three">
                    <div class="content_three_title">
                        <div style="margin-left: 10px;display: flex;align-items: center">
                            <span style="width: 133px"><el-checkbox @click="allChecked" v-model="checked"><span  style="color: #434343;font-size: 14px">全选</span></el-checkbox></span>
                            <span style="width: 208px">商品</span>
                            <span style="width: 120px"></span>
                            <span style="width: 150px">单价</span>
                            <span style="width: 180px">数量</span>
                            <span style="width: 80px">小计</span>
                            <span>操作</span>
                        </div>
                    </div>

                    <div class="content_three_table">
                        <ul>
                          <li v-for="(item,index) in shoppingCar" :key="item.id">
                              <span  class="checkBox">
                                  <input ref="checked_" @click="Checked_(index,item)"   type="checkbox" :checked="isChecked">
                              </span>
                              <span class="product_img"><el-image style="width: 80px;height: 80px" :src="item.img" lazy></el-image></span>
                              <span class="product_title" @click="product_detail(item.id)"><a>{{item.title}}</a></span>
                              <span class="product_price">

                                  <span>¥<span style="margin-left: 3px">{{item.price}}</span></span>
                              </span>
                              <span class="product_num">
                                  <el-input-number v-model="item.num" @change="change_nums(item.id,item.num,item.Address,index)" :min="1" label="描述文字"></el-input-number>
                              </span>
                              <span class="product_totalPrice"><strong>¥<span style="margin-left: 3px">{{ item.num * item.price}}</span></strong></span>
                              <span class="delete" @click="Delete(item.id)"><a>删除</a></span>
                          </li>
                        </ul>
                    </div>

                    <div class="billing">
                      <div class="billing_checked">
                          <el-checkbox @click="allChecked" v-model="checked">
                            <span  style="color: #434343;font-size: 14px">
                                全选
                            </span>
                          </el-checkbox>
                      </div>
             <div class="billing_total">
                 <div class="billing_total_one">
                     <span style="font-size: 13px"><span style="color: #999999">已选择</span><span style="color: #E4393C;margin-left: 5px;font-size: 16px">{{checkedProduct}}</span><span style="margin-left: 5px;color: #999999">件商品</span></span>
                     <span style="color: #999999;font-size: 13px;margin-left: 10px">总价：</span>
                     <span style="font-size: 16px;font-weight:bolder;color: #E4393C">¥{{totalPrice}}</span>
                 </div>
                 <div class="billing_total_tow" @click="billing"><a>去结算</a></div>

             </div>
                    </div>
                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>

    import axios from "@/axios"
    import SelectAddress from "@/components/SelectAddress";
    export default {
        name: "shoppingCarView",
        components:{'SelectAddress':SelectAddress},
        data(){
            return{
                username:'',
                user_id:null,
                total:null,
                totalPrice:0,
                checkedProduct:0,
                checked:false,
                isChecked:false,
                Address:[],
                shoppingCar:[]
            }
        },
        async created() {
            this.username=this.$store.state.username
            this.user_id=this.$store.state.user_id
            console.log(this.username)
            console.log(this.user_id)
            //获取用户地址
           // var result2=await axios.get('/getUser',{params:{username:this.username}})
           // console.log(result2.data.data[0].Adress)
           // this.Address=JSON.parse(result2.data.data[0].Adress)
            //获取购物车的数据
            var result=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
            console.log(result.data)
            this.shoppingCar=result.data.data

            //console.log(this.Address)
            this.total=result.data.data.length


        },
        mounted() {

                var data=this.shoppingCar.filter((item)=>{

                    return item.ischecked==='1'
                })
                data.forEach((item,index)=>{
                    this.$refs.checked_[index].checked=true
                })
                console.log(data)


        },
        methods:{
            product_detail:async function(id){
                var result4=await  axios.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',{params:{goods_id:id}})

                this.product_details=result4.data
                console.log(result4.data)
                var data=JSON.stringify(result4.data)

                window.localStorage.setItem('productDetail',data)
                console.log(window.localStorage.getItem('productDetail'))
                //console.log(result4.data.message.goods_id)
                this.$router.push({name:'ProductDetails',params:{data:data,username:this.username,user_id:this.user_id}})
            },
            billing:function(){
                var allChecked=this.$refs.checked_.filter((item)=>{
                    return item.checked==true
                })
                console.log(allChecked)
                  var checked=this.shoppingCar.filter((item)=>{
                      return item.ischecked==true
                  })

                var isEmpty=JSON.stringify(allChecked)
                console.log(checked)
                if (isEmpty=='[]'){
                    this.$alert('请至少选择一件商品！', '警告', {
                        confirmButtonText: '确定',
                    });
                }else {
                    this.$router.push({name:'billing',params:{username:this.username,user_id:this.user_id,checkedProduct:JSON.stringify(checked)}})
                }


            },
            home:function(){
                this.$router.push({name:'home',params:{username:this.username,user_id:this.user_id}})
            },
            Delete: function(id){
                console.log(id)
                this.$confirm('确定删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var result=await axios.post('/deleteShoppingCar',{id:id})
                    console.log(result.data)
                    var result2=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
                    console.log(result2.data)
                    this.shoppingCar=result2.data.data
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
             change_nums:async function(id,num,Address,index){

                //console.log(id)
                //console.log(num)
                 var result2=await axios.get('/getProductNum',{params:{id:id}})
                 //console.log(result.data.data.num)
                 var getNum=result2.data.data.num
                 var price=result2.data.data.price
                 console.log(this.$refs.checked_[index].checked)
                 if (this.$refs.checked_[index].checked===true){
                     if (getNum>num){
                         this.totalPrice=this.totalPrice-price
                     }else {
                         this.totalPrice=this.totalPrice+price
                     }
                 }



                 var result=await axios.post('/upDataProduct',{id:id,num:num,Address:Address})
                 console.log(result)


            },
            allChecked:async function () {
                //console.log(this.checked)
                var result=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
               // console.log(result.data.data)
                var arr=result.data.data
                //进行全选的时候首先要将商品总价与选择的商品清零
                this.totalPrice=0
                this.checkedProduct=0

                if (this.checked==true){
                    this.isChecked=true
                    console.log('哈哈')
                    arr.forEach((item)=>{
                        this.totalPrice=this.totalPrice+(item.num*item.price)
                    })

                    this.checkedProduct=arr.length
                    this.shoppingCar.forEach((item,index)=>{
                        this.shoppingCar[index].ischecked=true
                    })
                }
                else {
                    this.isChecked=false
                    this.totalPrice=0
                    this.checkedProduct=0
                    this.shoppingCar.forEach((item,index)=>{
                        this.shoppingCar[index].ischecked=false
                    })
                }

            },
            Checked_:async function (index,item) {

                var allChecked=this.$refs.checked_.filter((item)=>{
                    return item.checked==true
                })
                //console.log(allChecked)
                this.checkedProduct=allChecked.length

                if (allChecked.length==this.shoppingCar.length){
                    this.checked=true
                }else {
                    this.checked=false
                }



                if (this.$refs.checked_[index].checked==true){
                    this.$refs.checked_[index].checked=true
                    console.log(this.$refs.checked_)
                    this.totalPrice=(item.num * item.price)+this.totalPrice
                    this.shoppingCar[index].ischecked=true
                    console.log(this.shoppingCar[index])
                }else {
                    this.$refs.checked_[index].checked=false
                    this.totalPrice=this.totalPrice-(item.num * item.price)
                    this.shoppingCar[index].ischecked=false
                }


            }
            },

        watch:{

        }
    }
</script>

<style scoped>
    .billing_total_one{
        margin-right: 30px
    }
    .billing_total_tow a{
        color: #ffffff;
    }
    .billing_total_tow{
        height:50px ;
        width: 94px;
        background-color:#E64347 ;
        font-size: 18px;
        font-weight: bolder;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .billing_total{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .billing_checked{
       margin-left: 10px;
    }
    .billing{
        margin-top: 20px;
        background-color: #FFFFFF;
        border: 1px solid #F0F0F0;
        width: 997px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-checkbox__input{
        margin-top: -20px;
    }


    .checkBox{
        margin-left: 10px;
        padding: 0;
        width: 14px;
        height: 14px;
    }
    .product_img{
        border:1px solid #EEEEEE;
        width: 81px;
        height: 81px;
        margin-left: 18px;

    }

    .product_title a:hover{
        display: flex;
        flex-wrap: wrap;
        width: 206px;
        line-height: 20px;
        font-size: 13px;
        cursor: pointer;
        font-family: verdana,Microsoft YaHei,SimSun,-apple-system,BlinkMacSystemFont,PingFang SC;
        color: #E4393C;
    }
    .product_title a{
        display: flex;
        flex-wrap: wrap;
        width: 206px;
        line-height: 20px;
        font-size: 13px;
        color: #333333;
        cursor: pointer;
        font-family: verdana,Microsoft YaHei,SimSun,-apple-system,BlinkMacSystemFont,PingFang SC;
    }
    .product_title{
        margin-left: 15px;
    }
    .product_price span{
        color: #333333;
        font-size: 14px;
    }
    .product_price{
      margin-left:120px ;

    }

    .product_num{
        margin-left: 66px;

    }

    .product_totalPrice strong{
        font-size: 14px;
    }
    .product_totalPrice{
       margin-left: 70px;
    }
    .delete a:hover{

        color: #E4393C;
        border-bottom: 1px solid #E4393C;
    }
    .delete a{
        border-bottom: 1px solid #999999;
    }
    .delete{
         margin-left: 47px;
        cursor: pointer;
    }
    .content_three_table ul li span{
        margin-top: 50px;
    }
    .content_three_table ul li{
        width: 997px;
        height: 156px;
        border-top:2px solid #AAAAAA ;
        border-right:1px solid #F1F1F1 ;
        border-left:1px solid #F1F1F1 ;
        border-bottom:1px solid #F1F1F1 ;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
    }
    .content_three_table{
       margin-top: 20px;
    }
    .content_three_title span{
        font-size: 14px;
        color:#434343 ;
    }
    .content_three_title{
        background:#F3F3F3 ;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 997px;
        height: 43px;
    }
    .content_three{
        display: flex;
        flex-direction: column;
        margin-left: 250px;
        margin-top: 20px;
    }
    .-address- SelectAddress{
        width: 132px;
        height: 23px;
        margin-left: 10px;
        font-size: 12px;
    }
    .-product-hunt span{
        color: #e2231a;
        font-weight:bolder;
        font-size: 16px;
        cursor: pointer;

    }
    .-product-hunt{
        display: flex;
        flex-direction: row;
    }
    .-address-{
        display: flex;
        flex-direction: row;
        margin-right: 250px;
        justify-content: center;
        align-items: center;
    }
    .content_tow_tito{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 250px;

    }
    .content_tow{
        margin-top: 50px;
    }
    .btn span{
        color: #ffffff;
        font-size: 14px;
        font-weight: 700;
    }
    .btn{
        width: 48px;
        height: 27px;
        background:#C91623 ;
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .iput{
        width: 270px;
        height: 24px;
        border: 2px solid #C91623;
        outline: none;
    }
    .search_{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
.search{
    margin-right: 250px;
    margin-top: 20px;
}

    .logo{
        margin-left: 250px;
    }
    .content_one{
        display: flex;
        flex-direction: row;
         justify-content: space-between;
        align-items: center;
    }
    .header{
        background-color:#E3E4E5 ;
        height: 30px;
    }

</style>