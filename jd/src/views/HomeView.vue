<template>

    <div class="container">
        <el-container>
            <el-header class="header">
                <div>
                    <span></span>
                    <span>欢迎您！{{username}}</span>
                </div>
                <div>
                    <el-button @click="out" type="danger">退出登入</el-button>
                </div>
            </el-header>
            <el-main class="main">
               <div ref="content_one" class="content_one">
                   <div class="Logo">
                       <a ref="Logos" class="Logos"></a>
                   </div>
                   <div class="search">
                       <div ref="search_" class="search_">
                           <div style="display: flex;flex-direction: row">
                               <input @keydown="show($event)" value=""  ref="input_" @input="input"  class="ipt" type="text" placeholder="请搜索...">
                               <button class="btn">搜索</button>
                           </div>
                           <div ref="search_list" class="search_list">
                               <ul>
                                   <li @click="product_list(item.goods_id)" v-for="(item,index) in search_list.splice(0,10)" :key="index">{{item.goods_name}}</li>
                               </ul>
                           </div>
                       </div>

                       <div ref="title_" class="title">
                           <span><a style="color: #E1251B">抢iPhone14</a></span>
                           <span><a>手配专区</a></span>
                           <span><a>iPhone14</a></span>
                           <span><a>京东京造</a></span>
                           <span><a>电视影音</a></span>
                           <span><a>世界杯</a></span>
                           <span><a>显示器</a></span>
                           <span><a>健康助农</a></span>
                       </div>
                       <div ref="title_2" class="title_2">
                           <span><a>京东五金城</a></span>
                           <span><a>京东超市</a></span>
                           <span><a>秒杀</a></span>
                           <span><a>京东家电</a></span>
                           <span><a>京东生鲜</a></span>
                           <span><a>优惠卷</a></span>
                           <span><a>PLUS会员</a></span>
                           <span><a>拍卖</a></span>
                           <span><a>品牌闪购</a></span>
                           <span><a>京东云</a></span>
                       </div>

                   </div>
                   <div ref="shoppCar" @click="shoppingCar" class="shoppCar">
                             <span>
                               <el-badge :value="product_num" class="item">
                         <i style="color: #E1251B" class="fa fa-shopping-cart"></i>
                               </el-badge>
                             </span>

                       <span style="font-size: 12px;margin-left: 10px;cursor: pointer ">
                           <a style="color: #E1251B;">我的购物车</a>

                       </span>

                   </div>
                   <div ref="order_" class="myOrder" @click="myOrder">
                       <span style="font-size: 12px;margin-left: 10px;cursor: pointer ">
                           <a style="color: #E1251B;">我的订单</a>
                       </span>
                   </div>
               </div>
                <div class="content_tow">
                    <div class="productCat">
                               <div class="catt">
                                   <ul class="cat_one" >
                                       <li @mouseover="mouseover(index.id)" @mouseout="mouseout" v-for="(index) in productList " :key="index.id">
                                           <a>{{index.product_name}}</a>
                                       </li>
                                   </ul>

                                   <div class="cat_tow" ref="cat_tow" @mouseout="mouseout_" @mouseover="mouseover_">
                                       <ul>
                                           <li class="li_" @mousemove="mousemove(index2.id)" v-for="(index2) in childrenList" :key="index2.id">

                                   <span>
                                      <a>{{index2.product_name}}<i style="margin-left: 10px" class="fa fa-angle-right"></i></a>
                                   </span>

                                               <span v-for="(index3) in childrenList2" :key="index3.id"><a>{{index3.product_name}}</a></span>
                                           </li>
                                       </ul>
                                   </div>
                               </div>


                        <!-- 轮播部分 -->
                        <div class="lunbo" >


                                <el-carousel height="470px" v-if="lunboImg[0]"  :interval="5000" arrow="always">
                                    <el-carousel-item v-for="(index,key) in lunboImg" :key="key">
                                        <el-image  :fit="fit" class="img" :src="index.url"></el-image>

                                    </el-carousel-item>
                                </el-carousel>


                        </div>
                    </div>
                </div>

                <div class="content_three">

                      <div ref="grid_c1" class="grid_c1">
                          <h3>
                              <div style="display: flex;justify-content: center;align-items: center">
                                  <span style="font-size: 28px;color: #333333;font-weight: 700;cursor: default">为你推荐</span>
                                  <img style="width: 60px;height: 20px" src="//gw.alicdn.com/imgextra/i2/O1CN016b1mMM1FxJlsXfWhU_!!6000000000553-2-tps-96-30.png">
                              </div>

                          </h3>
                      </div>

                    <div class="productList"  >

                        <div @click="product_date(index.goods_id)" v-loading="loading"  class="productCard" v-for="(index,key) in product" :key="key">

                            <div class="product_Img">
                                <el-image  :src="index.goods_small_logo" lazy></el-image>
                            </div>
                            <div class="product_Title">
                                <span ref="title" class="titles">{{index.goods_name}}</span>
                            </div>
                            <div class="product_Price">
                                <span style="font-size: 12px;font-weight: 700;margin-left: 3px;">¥</span>
                                <span>{{index.goods_price}}</span>
                            </div>
                        </div>






                    </div>
                </div>

            </el-main>
            <div ref="backTop" @mouseout="chuqu" @mouseover="jinlai" @click="backTop" class="backTop">
                <i ref="icons" id="ccc" style="font-size: 20px;" class="fa fa-angle-double-up"></i>
                <span ref="dingb">顶部</span>
            </div>
            <el-footer class="footer"> </el-footer>
        </el-container>
    </div>

</template>
<script>
    import axios from '@/axios'
    import {ElMessage} from "element-plus";

   import $ from 'jquery'
export default {
  name: 'HomeView',
  components: {

  },
    data(){
      return{
          username:'',
          productList:[],
          childrenList:[],
          childrenList2:[],
          lunboImg:[],
          fit:'cover',
          product:[],
          loading:true,
          product_details:[],
          product_num:0,
          user_id:null,
          Value:'',
     search_list:[]
      }
    },

 async created() {

     this.user_id=this.$store.state.user_id
     console.log(this.user_id)
     this.username=this.$store.state.username
     console.log(this.username)


     // this.product_num=JSON.parse(window.localStorage.getItem('shoppingCar')).length
     var shopCar=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
     console.log(shopCar)
     this.product_num=shopCar.data.data.length
     console.log(this.product_num)
    // console.log(this.product_num)


      var result=await axios.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/search',{params:{pagenum:1,pagesize:200}})
     //console.log(result.data.message.goods)
     this.loading=false
      this.product=result.data.message.goods

  var data=this.product.filter((item)=>{
        return  item.goods_small_logo!=''
  })
     console.log(data)
     //console.log(this.product)
     this.product=data

     var result2=await axios.post('/ProductCat')
     //console.log(result2.data.data)
     //console.log(this.username)
     this.productList=result2.data.data
     //console.log(this.productList)

     var result3=await axios.get('/getImg')
      this.lunboImg=result3.data.data
     //console.log(this.lunboImg)


},
mounted() {

      document.addEventListener('scroll', this.scrollEvent);
},
    watch:{
      async Value(){
         if (this.Value==''){
             this.$refs.search_list.style.display='none'
             console.log('wwwww')
         }else {
             this.$refs.search_list.style.display='flex'
             var result=await axios.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',{params:{query:this.Value}})
             //console.log(result.data)
             this.search_list=result.data.message
             console.log('123')
         }
      }
    },
    methods:{
      chuqu:function(){
          this.$refs.icons.style.color='#E4393C'
          this.$refs.dingb.style.color='#E4393C'
      },
      jinlai:function(){
          this.$refs.icons.style.color='#ffffff'
          this.$refs.dingb.style.color='#ffffff'
      },
        backTop:function(){
            //document.documentElement.scrollTop=0
            $('body,html').animate({scrollTop:0},1000)

        },
        myOrder:function(){
            this.$router.push({name:'OrderManagement'})
        },
        out:function(){

            window.localStorage.setItem('token_jzh','')
            ElMessage({
                showClose: true,
                message: '退出成功',
                type: 'success',
            })
            this.$router.push({name:'login'})
        },
        shoppingCar:function(){
              this.$router.push({name:'shoppingCar',params:{username:this.username,user_id:this.user_id}})
        },
        product_list:async function(id){
            console.log(id)
            var result4=await  axios.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',{params:{goods_id:id}})
            console.log(result4)

            this.product_details=result4.data
           // console.log(result4.data.message.pics)
            var isEmpty=JSON.stringify(result4.data.message.pics)
            if (isEmpty=='[]'){
                console.log('123')
                console.log(this.user_id)
                this.$router.push({name:'Erro',params:{username:this.username,user_id:this.user_id}})
            }else {
                console.log('456')
                var data=JSON.stringify(result4.data)
                window.localStorage.setItem('productDetail',data)

                this.$router.push({name:'ProductDetails',params:{data:data,username:this.username,user_id:this.user_id}})

            }


        },
        show:function(data){
            console.log(data.keyCode)
        },
         input: async function(){
             //console.log()
             this.Value=this.$refs.input_.value
             console.log(this.Value)



         },
        scrollEvent(){

              var scrollTop=document.documentElement.scrollTop
            //console.log(scrollTop)
              if (scrollTop>=690){
                      this.$refs.content_one.className='content_one_scroll'
                      this.$refs.Logos.className='Logos_scroll'
                      this.$refs.title_.style.display='none'
                      this.$refs.title_2.style.display='none'
                      this.$refs.shoppCar.className='shoppCar_scroll'
                      this.$refs.search_.className='search_scroll'
                      this.$refs.search_list.className='search_list_scroll'
                      this.$refs.order_.className='myOrder_scroll'
                      this.$refs.backTop.style.display='flex'
                     // $('.content_one_scroll').animate({top:0},500)
              }else {
                  this.$refs.content_one.className='content_one'
                  this.$refs.Logos.className='Logos'
                  this.$refs.title_.style.display='block'
                  this.$refs.title_2.style.display='block'
                  this.$refs.shoppCar.className='shoppCar'
                  this.$refs.search_.className='search_'
                  this.$refs.search_list.className='search_list'
                  this.$refs.order_.className='myOrder'
                  this.$refs.backTop.style.display='none'

              }
        },
      mouseover:function (id) {
          //console.log(this.productList)
          this.$refs.cat_tow.style.display='flex'

            this.productList.forEach((item)=>{

                // console.log(item.children)
                  item.children.forEach((item2)=>{
                      if (item2.first_cat_id==id){
                          this.childrenList=item.children
                          //console.log(this.childrenList)

                      }
                  })


            })
      },

      mouseout:function () {
       this.$refs.cat_tow.style.display='none'
      },
        mouseover_:function () {
            this.$refs.cat_tow.style.display='flex'
        },
        mouseout_:function () {
            this.$refs.cat_tow.style.display='none'
        },
       product_date: async function (id) {
           var result4=await  axios.get('https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',{params:{goods_id:id}})

           this.product_details=result4.data
           console.log(result4.data)
           var data=JSON.stringify(result4.data)

              window.localStorage.setItem('productDetail',data)
           console.log(window.localStorage.getItem('productDetail'))
           //console.log(result4.data.message.goods_id)
             this.$router.push({name:'ProductDetails',params:{data:data,username:this.username,user_id:this.user_id}})
       }
    }

}
</script>
<style scoped>

    #ccc{
        color: #E4393C;
    }

    .backTop span{
        color: #E4393C;
    }
    .backTop:hover{
        width: 60px;
        height: 60px;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: #E4393C;
        position: fixed;
        left: 1430px;
        top: 600px;
        flex-direction: column;
        cursor: pointer;
    }
    .backTop{
        width: 60px;
        height: 60px;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        position: fixed;
        left: 1430px;
        top: 600px;
        flex-direction: column;
        cursor: pointer;
    }
    .search_list_scroll{
        display: none;
        flex-direction: column;
        border: 1px solid #EEEEEE;
        box-shadow: 2px 0px 2px rgba(0,0,0,.3);
        width:500px ;
        height: 500px;
        margin-top: 5px;
        z-index: 1000;
        background: #FFFFFF;
        position: fixed;
        top: 45px;
    }
    .search_list{
          display: none;
          flex-direction: column;
          border: 1px solid #EEEEEE;
          box-shadow: 2px 0px 2px rgba(0,0,0,.3);
         width:500px ;
         height: 500px;
        margin-top: 5px;
        z-index: 1000;
        background: #FFFFFF;
    }
    .product_Img{
        width: 160px;
        height: 160px;
        margin: 40px 40px;
    }
    .product_Price{
        display: flex;
        flex-direction: row;
        color: #E1251B;
        margin-top: 20px;
        align-items: center;
        margin-left: 10px;
    }
    .titles{

        overflow: hidden;
        height: 40px;
        line-height:20px ;
        font-size: 15px;
        text-overflow: ellipsis;
        color: #666666;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 200px;
        margin-left: 10px;
    }


    .productCard:hover{
        width: 230px;
        height: 350px;
        margin-left: 10px;
        background-color: #FFFFFF;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all .5s ;
        transform:scale(1.03)  translate3d(0,0,0);
    }
    .productCard{
        width: 230px;
        height: 350px;
        margin-left: 10px;
        background-color: #FFFFFF;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all .5s;
    }
    .productList{
        margin-left: 200px;
        display: flex;
        flex-direction: row;
        width: 1200px;
        flex-wrap: wrap;
    }
    .grid_c1{
        margin-left: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .catt{
        display: flex;
        flex-direction: row;
    }
    .content_three{
        background-color:#F4F4F4 ;
    }

  .img{
      width: 1000px;
      height: 470px;
  }
    .lunbo{
     width: 1000px;
        height: auto;
     margin-left: 10px;
    }
    .li_{
        display: flex;
        flex-direction: row;
    }
    .cat_tow ul li span{
        display: flex;
        justify-content: flex-end;
    }
    .cat_tow ul {
        margin-top: 30px;
        margin-left: 30px;
    }
    .cat_tow ul li span a:hover {
        display: block;
        cursor: pointer;
        margin-bottom: 15px;
        font-size: 12px;
        color: #DC4933;
        font-weight: bold;
    }
    .cat_tow ul li span a {
        display: block;
        cursor: pointer;
        margin-bottom:15px ;
        font-size: 12px;
        color: #333333;
        font-weight: bold;
    }
    .cat_tow{
        display: none;
         margin-left: 1px;
        width: 1000px;
        height: 470px;
        background-color: #FFFFFF;
        box-shadow: 3px 0px 5px rgba(0,0,0,.3);
        z-index: 999;
        position: absolute;
       left: 390px;

    }
    .productCat{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }

    .cat_one li a:hover{
        margin-left: 30px;
        color:#CC3E40 ;
    }
    .cat_one li a{
        margin-left: 30px;
        color:#333333 ;
    }
    .cat_one li:hover{
        cursor: pointer;
        width: 190px;
        height: 25px;
        background-color: #D9D9D9;
        font-size: 18px;
        display: flex;
        align-items: center;
    }
    .cat_one li{
        cursor: pointer;
        width: 190px;
        height: 25px;
      font-size: 18px;
        display: flex;
        align-items: center;
    }
    .cat_one{
        background-color: #FEFEFE;
        width: 190px;
        height: 470px;
        margin-left: 200px;
        display: flex;
        flex-direction: column;


    }
    .content_tow{
        background-color: #f4f4f4;
    }
    .shoppCar_scroll{
        margin-top: 10px;
        width: 132px;
        height: 30px;
        background-color:#ffffff ;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .myOrder_scroll{
        margin-top: 10px;
        width: 132px;
        height: 30px;
        background-color:#ffffff ;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
    .myOrder{
        margin-top: 20px;
        width: 132px;
        height: 30px;
        background-color:#ffffff ;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
    .shoppCar{
        margin-top: 20px;
        width: 132px;
        height: 30px;
        background-color:#ffffff ;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .title_2 span a:hover{
        color: #E1251B;
        font-size: 18px;

    }
    .title_2 span a{
        color: #333333;
        font-size: 18px;

    }
    .title_2 span{

        margin-top: 30px;
        margin-left: 15px;
        cursor: pointer;
    }
    .title_2{

        display: flex;
        flex-direction: row;
        width: 800px;

    }
    .title span a:hover{
        color: #E1251B;
    }
    .title span a{
        color: #999999;

    }
    .title span{
         margin-top: 10px;
        font-size: 13px;
        margin-left: 10px;
        cursor: pointer;
    }
    .title {
         margin-left: 50px;
        display: flex;
        flex-direction: row;

    }

    .btn{
        width: 80px;
        height: 42px;
        color: #f4f4f4;
        background: #E4393C;
        outline: none;
        border: none;
        cursor: pointer;
    }
    .ipt{
        width: 500px;
        border: 1px solid #E1251B;
        text-indent:10px;
        height: 40px;
        outline: none;

    }
    .search_scroll{
        display: flex;
        flex-direction: row;
        margin-left: 50px;
        margin-top: -15px;
    }
    .search_{
        display: flex;
        flex-direction: column;
        margin-left: 50px;
    }
   #icon{
       margin-left: -20px;
   }
    *{
        margin: 0px;
        padding: 0px;
    }
    .search{
        width: 800px;
        height: 40px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;

    }


    .Logo{
        margin-left: 200px;
        width: 190px;
        height: 120px;
    }
    .Logo img{
        width: 134px;
        height: 120px;
    }
    .main{
        background-color:#F4F4F4 ;
        padding: 0px;
    }

    @keyframes searchTop {
      0%{
      top: -50px;
    }
        100%{
            top: 0px;
        }
    }
    .content_one_scroll{
        background-color:#FFFFFF ;
        display: flex;
        flex-direction: row;
         height: 51.6px;
        position: fixed;
        border-bottom: 2px solid #E4393C;
        z-index: 999;
        width: 100%;
        animation: searchTop .5s ease-in-out;
        top: 0;

    }
    .content_one{
        background-color:#FFFFFF ;
        display: flex;
        flex-direction: row;
        height: 140px;

    }
    .header{
        background-color:#E3E4E5 ;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

</style>