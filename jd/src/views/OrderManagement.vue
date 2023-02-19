<template>
    <div class="container">
        <el-container>
        <el-header class="header">
            <div>

                <span style="cursor: pointer"><i class="fa fa-home"></i><a class="black" @click="home">首页</a></span>
                <span style="margin-left: 10px">欢迎您！{{username}}</span>
            </div>
        </el-header>
        <el-main class="main">

            <div class="content_one">
                <div @click="shoppingCar" class="shoppingCar">
                    <span>
                               <el-badge :value="product_num" class="item">
                         <i style="color: #E1251B" class="fa fa-shopping-cart"></i>
                               </el-badge>
                             </span>

                    <span style="font-size: 12px;margin-left: 10px;cursor: pointer ">
                           <a style="color: #E1251B;">我的购物车</a>

                       </span>
                </div>
            </div>

            <div class="content_tow">
                <div class="content_tow_title">
                    <span><h3>我的订单</h3></span>
                </div>
            </div>
            <div style="margin-left: 250px;background-color: #ffffff;display: flex;flex-direction: column;width: 1100px;margin-top: 20px">
            <div class="content_three">
                 <div class="toggle">
                     <ul class="toggle_ul">
                         <li class="li" @click="toggle(index)" v-for="(item,index) in li_" :key="index" ref="li_">{{item}}</li>
                     </ul>
                 </div>
                <div class="nav_">
                    <el-dropdown style="display: flex;margin-left: 15px">
                         <span class="el-dropdown-link">近三个月订单<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <template v-slot:dropdown>
                            <el-dropdown-menu  >
                                <el-dropdown-item>近三个月订单</el-dropdown-item>
                                <el-dropdown-item>今年内的订单</el-dropdown-item>
                                <el-dropdown-item>2021年订单</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span style="width: 300px">订单详情</span>
                    <span style="width: 290px">收货人</span>
                    <span style="width: 100px">金额</span>
                    <span style="width: 100px">状态</span>
                    <span style="width: 120px">操作</span>
                </div>
                <div class="orderList">
                    <div class="div" style="display: block">
                        <ul>
                            <li class="orderContent" v-for="(item,index) in OrderList" :key="index">
                             <div class="orderContent_one">
                                 <div style="display: flex;flex-direction: row;align-items: center">
                                     <span style="color: #aaaaaa">{{item.time}}</span>
                                     <span style="margin-left: 50px;color: #aaaaaa">订单号:<a style="color: #333333;margin-left: 10px">{{item.orderNum}}</a></span>
                                 </div>
                                 <span @click="deleteOrder(item.id)"><i id='trash'  class="fa fa-trash-o"></i></span>
                             </div>

                                <div class="orderContent_tow">
                                    <ul class="ul__">
                                        <li class="li___" v-for="(item2,index2) in JSON.parse(item.productInfo)" :key="index2">
                                            <div class="kk" style="display: flex;flex-direction: row;margin-top: 15px">
                                                <span style="border: 1px solid #E5E5E5;width: 61px;height: 61px;margin-left:15px"><el-image style="width: 60px;height: 60px;" :src="item2.img"></el-image></span>
                                                <span @click="product_detail(item2.id)" class="kks">{{item2.title}}</span>
                                                <span style="color: #aaaaaa;margin-left: 100px">x{{item2.num}}</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <div class="user">
                                            <div style="display: flex;flex-direction: row;margin-top: 15px;align-items: center;margin-left: 30px">
                                                <span>{{item.consignee}}  <i style="color:#aaaaaa;" class="fa fa-user-o"></i></span>
                                            </div>
                                    </div>
                                    <div class="price">
                                        <div style="display: flex;flex-direction:column;margin-top: 15px;align-items: center;width: 90px;margin-left: 8px;border-bottom: 1px solid #E5E5E5;justify-content: center">
                                            <span>￥{{item.orderPrice}}</span>
                                        </div>
                                        <span style="margin-left: 30px">在线支付</span>
                                    </div>
                                    <div class="orderStatus">
                                            <span v-if="item.status=='true'">交易完成</span>
                                            <span v-if="item.status=='false'">待付款</span>
                                    </div>
                                    <div class="point">
                                        <span @click="payment(item.pay,item.orderNum)" v-if="item.status=='false'">立即付款</span>
                                        <span @click="buybacks(item.productInfo)" v-if="item.status=='true'">回购</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!--进行分页--->
                        <div class="fenye">

                            <span @click="BackPage" class="fenye_one">上一页</span>
                            <span class="fenye_tow">{{page}}</span>
                            <span @click="NextPage" class="fenye_thress">下一页</span>

                        </div>
                    </div>
                    <div class="div"><PaymentCom @pay="payment"></PaymentCom></div>
                    <div class="div">待收货</div>
                    <div class="div">待评价</div>
                </div>
            </div>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
    import axios from '@/axios'
    import $ from 'jquery'
    import PaymentCom from "@/components/PaymentCom";
    export default {
        name: "OrderManagement",
        components:{PaymentCom},
        data(){
            return{
                a:null,
                page:1,
                total:null,
                slot:'dropdown',
                product_num:0,
                user_id:null,
                username:'',
                OrderList:[],
                li_:['全部订单','待付款','待收货','待评价']
            }
        },
        created() {
              this.user_id=this.$store.state.user_id
              this.username=this.$store.state.username
            //调用我们的购物车数据
            this.getProductNum()
            //调用我们的订单数据
            this.getOrder()

        },
        mounted() {
            console.log(this.$refs.li_)
           this.$refs.li_[0].className='li_'
        },
       methods:{
            BackPage:function(){
                if (this.page==1){
                    console.log('不能在上一页了')
                }
                else {
                    this.page--
                    this.getOrder()
                }
            },
            NextPage:function(){

                if (this.a<this.page){
                    console.log('没有数据了')
                }else {
                    this.page++
                    this.getOrder()
                }


            },
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
            payment:function(pay,orderNum){
                console.log(pay)
                window.open(pay)
                //查询一下支付状态

                var that=this

                var clean=setInterval(async function () {
                    var result2=await axios.post('/PaySuccess',{order:orderNum})
                    console.log(result2)
                    console.log(result2.data.result.message)
                    if (result2.data.result.status===2){
                        console.log('交易完成')
                        var result=await axios.post('/upDataOrder',{status:'true',orderNum:orderNum})
                        console.log(result)
                        that.getOrder()
                        clearInterval(clean)
                    }else if (result2.data.result.status===0){
                        console.log('等待买家付款')
                        //删除正在交易的商品

                    }
                },5000)
            },
           buybacks: function(data){
               console.log(data)
               var product=JSON.parse(data)
               console.log('huigou')
               console.log(product)
               product.forEach(async (item)=>{
                    var result=await  axios.post('/addProduct',{id:item.id,title:item.title,price:item.price,img:item.img,ischecked:false,user_id:this.$store.state.user_id,num:item.num})
                   console.log(result.data)
               })
               this.$router.push({name:'shoppingCar'})

           },
           deleteOrder:function(id){
               this.$confirm('您确定要删除该订单吗', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
               }).then(async () => {
                   var result=await axios.post('/deleteOrder',{id:id})
                   console.log(result)
                   this.getProductNum()
                   //调用我们的订单数据
                   this.getOrder()
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
            toggle:function(index){
                this.li_.forEach((item,index2)=>{
                    if (index2==index){
                        this.$refs.li_[index].className='li_'
                        $('.div').eq(index).css({display:'block'})
                    }else {
                        this.$refs.li_[index2].className='li'
                        $('.div').eq(index2).css({display:'none'})
                    }
                })
            },
           shoppingCar:function(){
               this.$router.push({name:'shoppingCar'})
           },
            async getProductNum(){
                var result=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
                console.log(result.data.data.length)
                this.product_num=result.data.data.length
            },
           home:function(){
               this.$router.push({name:'home'})
           },
           async getOrder(){
                 var result=await axios.get('/getOrder',{params:{user_id:this.user_id,pageNum:this.page}})
                 console.log(result.data.data)
                 this.OrderList=result.data.data
                 this.total=result.data.total
               console.log(this.total)
               var a=this.total / 4
               console.log(a)
               this.a=a

           },
       } ,
        watch:{

        }
    }
</script>

<style scoped>
    .fenye_thress{
        color:#cccccc;
        width: 80px;
        height: 30px;
        border: 1px solid #cccccc;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .fenye_tow:hover{
        width: 30px;
        height: 30px;
        color: #ffffff;
        background-color: #005AA0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;


    }
    .fenye_tow{
        width: 30px;
        height: 30px;
        color: #E4393C;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fenye_one{
     color:#cccccc;
        width: 80px;
        height: 30px;
        border: 1px solid #cccccc;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .fenye{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 15px;
        font: 14px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .point span:hover{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #E4393C;
        width: 90px;
        height: 30px;
        background-color: #F5F5F5;
        border: 1px solid #E4393C;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 15px;
    }
    .point span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #aaaaaa;
        width: 90px;
        height: 30px;
        background-color: #F5F5F5;
        border: 1px solid #DDDDDD;
        display: flex;
justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 15px;
    }
    .point{
        display: flex;
        width: 130px;
        justify-content: center;
    }
    .orderStatus span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #aaaaaa;
        margin-top: 15px;
    }
    .orderStatus{
        display: flex;
        width: 110px;
        border-right: 1px solid #E5E5E5;
       justify-content: center;
    }
    .price{
        width: 110px;
        border-right: 1px solid #E5E5E5;
        display: flex;
        flex-direction: column;
    }
    .price span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #aaaaaa;
        font-size: 13px;
        margin-bottom: 5px;
    }
    .user span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        color: #333333;

    }
    .user{
        width: 115px;
        border-right: 1px solid #E5E5E5;
    }
    .kks:hover{
        width: 236px;line-height: 18px;margin-left: 10px;color: #E4393C;cursor: pointer;
    }
    .kks{
        width: 236px;line-height: 18px;margin-left: 10px;color: #333333;cursor: pointer;
    }
    .kk span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;

    }
    .li___{
        display: flex;
        flex-direction: row;
        border-top: 1px solid #E5E5E5;
        height: 90px;
        border-right: 1px solid #E5E5E5;
    }
    .orderContent_tow{
        display: flex;
        flex-direction: row;
    }
    .ul__{
        width: 590px;
    }
    #trash:hover{
        color: #E4393C;font-size: 15px;margin-right: 20px;
        cursor: pointer;
    }
    #trash{
        color: #666666;font-size: 15px;margin-right: 20px;
        cursor: pointer;
    }
    .orderContent_one span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        margin-left: 10px;
    }
    .orderContent_one{
        display: flex;
        height: 31px;
        width: 1060px;
        background-color:#F5F5F5 ;
        align-items: center;
        justify-content: space-between;
    }
    .orderContent{
        display: flex;
        width: 1060px;
        border: 1px solid #E5E5E5;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .orderList{
        margin-top: 20px;
        margin-left: 20px;
    }
    .div{
        display: none;
    }
    .nav_ span{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        justify-content: flex-end;
        color: #666666;
    }
    .el-dropdown-link{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .nav_{
        display: flex;
        flex-direction: row;
        width: 1060px;
        height: 34px;
        background-color: #F5F5F5;
        margin-top: 15px;
        margin-left: 20px;
        align-items: center;

    }
    .toggle_ul li:hover{
        width: 50px;
        color: #E4393C;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .li_{
        width: 50px;
        color: #E4393C;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-bottom: 2px solid #E4393C;
    }
    .li{
        width: 50px;
        color: #333333;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .toggle_ul{
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        margin-top: 30px;
    }
    .content_three{
        display: flex;
        width: 1100px;
        flex-direction: column;
        margin-top: 20px;
    }
    .content_tow_title span{
        color: #666666;margin-left: 10px;
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    .content_tow_title{
        display: flex;
        align-items: center;
        width: 1100px;
        height: 58px;


    }
    .content_tow{
        display: flex;
        width: 1100px;
        flex-direction: column;
        margin-left: 250px;
        background-color: #ffffff;
        margin-top: 30px;

    }
    .shoppingCar{
       margin-right: 50px;
        width: 132px;
        height: 30px;
        background-color:#ffffff ;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .content_one{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 80px;
        background-color: #E2231A;
    }
    .main{
        padding: 0;
        margin: 0;
        background-color:#F5F5F5 ;
    }
    .header{
        background-color:#E3E4E5 ;
        height: 30px;
    }
    body{
        font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    }
    *{
        margin: 0;
        padding: 0;
    }
</style>