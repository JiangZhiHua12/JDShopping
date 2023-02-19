<template>
    <div ref="container_" class="container" >

        <el-container>
            <el-header class="header">
                <div>

                    <span><i class="fa fa-home"></i><a class="black" @click="home">首页</a></span>
                    <span>欢迎您！{{username}}</span>
                </div>
            </el-header>
            <el-main class="main">
                <div class="content_one">
                    <div class="logo">
                        <a class="Logo_Img"></a>
                    </div>
                    <div class="search">
                        <input class="ipt" type="text" placeholder="请搜索...">
                        <button class="btn">搜索</button>
                    </div>
                    <div class="shoppCar">
                        <span>
                            <el-badge :value="product_num"  class="item">
                           <i style="color: #E1251B" class="fa fa-shopping-cart"></i>
                        </el-badge>
                        </span>
                        <span @click='ShoppingCar' style="font-size: 12px;margin-left: 10px;cursor: pointer "><a style="color: #E1251B;">我的购物车</a></span>
                    </div>
                </div>
                <div class="content_tow">
                    <div class="content_tow_one">
                        <span class="shop">自营</span>
                        <span> <a>东东旗舰店</a></span>
                        <span ><i class="fa fa-commenting" style="color: #5992FE;"></i><a>联系客服</a></span>
                        <span><i class="fa fa-star" style="color: #E3393C;"></i><a>关注店铺</a></span>
                    </div>

                </div>
                <div class="content_three">
                    <div class="product_img">
                               <div class="img">
                                   <img style="width: 353px;height: 351px" ref="bigImgs" :src="this.imgList[0].pics_big">
                               </div>
                        <div class="arrow">
                            <div><a class="right" @click="click_right"></a></div>

                            <div style="width: 288px;overflow: hidden">

                                   <ul ref="ul" class="imgs">
                                    <li id="li"  ref="li" @mouseover="bigImg(key)" v-for="(index,key) in imgList" :key="key">
                                        <el-image :preview-src-list="srclist" style="width: 53px;height: 53px" :src="index.pics_big"></el-image>
                                    </li>
                                   </ul>

                            </div>

                            <div style="width: 22px"><a @click="click_left" class="left"></a></div>
                        </div>
                    </div>
                      <div class="introduce">
                          <div class="title">
                             <span class="title_one">{{this.product_title}}</span>
                          </div>
                          <div class="product_Price">
                              <span style="font-size: 12px;color: #999999;margin-left: 10px;cursor: default">京东价</span>
                              <div style="margin-left: 15px;display: flex;align-items: center">
                                  <span style="font-size: 16px;color: #E4393C;font-weight: 700;cursor: default">¥</span>
                                  <span class="price">{{this.product_price}}</span>
                              </div>
                               <span class="jianjia">降价通知</span>
                          </div>
                          <div class="address">
                              <span class="address_one">配送至</span>
                              <div class="address_tow">
                                  <select-address @Address="getAddress"></select-address>
                              </div>
                              <span class="address_three">有货</span>
                          </div>

                          <div class="addShoppingCar">
                              <div>
                                  <el-input-number v-model="num" @change="getNum" :min="1" :max="10" label="描述文字"></el-input-number>
                              </div>
                              <div style="margin-left: 10px">
                                  <button  @change="change_num" @click="addShoppingCar" class="btns">加入购物车</button>
                              </div>
                          </div>
                      </div>

                </div>

                <div class="content_four">

                    <div ref="introduce" class="introduce">
                        <div  class="introduce_">
                            <ul class="introduce_one" style="height: 48px" >
                                <li @click="toggle(key)" ref="toggle_li" v-for="(item,key) in introduct_list" :key="key">{{item}}</li>

                            </ul>
                        </div>

                    </div>

                    <div class="ww">
                        <div class="div">
                            <div class="hh" style="display: block" v-html="introduct_content">

                            </div>
                        </div>

                        <div  class="div">规格与包装</div>
                        <div  class="div">售后服务</div>
                        <div  class="div">商品评论</div>

                    </div>
                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>

    </div>
</template>

<script>
import $ from 'jquery'
import SelectAddress from "@/components/SelectAddress";
import axios from '@/axios'


//
    export default {
        name: "ProductDetails",
        data(){
            return{
                product_details:{},
                username:'',
                imgList:[],
                a:0,
                b:0,
                show:false,
                product_title:'',
                product_price:'',
                num:1,
                Address:[],
                product_num:0,
                introduct_list:['商品介绍','规格与包装','售后保障','商品评论'],
                introduct_content:'',
                srclist:[],

                user_id:null

            }
        },
        components:{

        'SelectAddress':SelectAddress
        },
        async created() {
           // this.product_details=JSON.parse(this.$route.params.data)
             this.product_details=JSON.parse(window.localStorage.getItem('productDetail'))
                //console.log(this.$store.state.productDetail)
            console.log(this.product_details)
                this.username=this.$store.state.username
                //console.log(this.username)

                this.user_id=this.$store.state.user_id
            //console.log(this.user_id)
                this.imgList=this.product_details.message.pics
                this.product_title=this.product_details.message.goods_name
                //console.log(this.imgList)
                this.product_price=this.product_details.message.goods_price
                var shopCar=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
                this.product_num=shopCar.data.data.length
                this.introduct_content=this.product_details.message.goods_introduce
                //console.log(this.introduct_content)
                this.getSrcList()
                document.documentElement.scrollTop=0


        },
        beforeMount() {
            console.log('hahaaaa')

        },
        mounted() {

                setInterval(this.goBack, 1000)

            this.$refs.li[0].className='is-active'
            this.default()
            //document.addEventListener('mousewheel',this.scrollEvent,true);
            document.addEventListener('scroll', this.scrollEvent);
        },
        watch:{

        },
        methods:{
            ShoppingCar:function(){
                this.$router.push({name:'shoppingCar'})
            },
            scrollEvent(){
                var scrollTop=document.documentElement.scrollTop  //滚动时距离顶部的距离
                //console.log(scrollTop)
               // var offsetTop=this.$refs.introduce.offsetTop
                //console.log(offsetTop)
                if (scrollTop>=765){
                      this.$refs.introduce.className='introduce_scroll'
                    //console.log('nima')
                }else  {
                    this.$refs.introduce.className='introduce'
                   // console.log('haha')
                }

            },
            getSrcList(){
                this.imgList.forEach((item)=>{
                       this.srclist.push(item.pics_big)
                })
                console.log(this.srclist)
            },
            default(){
                this.$refs.toggle_li[0].style.backgroundColor='#E4393C'
                this.$refs.toggle_li[0].style.color='#FFF'
                this.$refs.toggle_li[0].style.cursor='default'
                $('.ww .div').eq(0).css({display:'block'})
            },

            toggle:function(index){

                console.log(index)
                   this.introduct_list.forEach((item,index2)=>{

                       if (index2==index){
                           this.$refs.toggle_li[index].style.backgroundColor='#E4393C'
                           this.$refs.toggle_li[index].style.color='#FFF'
                           this.$refs.toggle_li[index].style.cursor='default'

                           $('.ww .div').eq(index).css({display:'block'})

                       }else {
                           this.$refs.toggle_li[index2].style.backgroundColor='#F7F7F7'
                           this.$refs.toggle_li[index2].style.color='#666'
                           this.$refs.toggle_li[index2].style.cursor='pointer'

                           console.log(index2)
                           $('.ww .div').eq(index2).css({display:'none'})

                       }
                   })



            },
             changess(num){
                 this.product_num=num
                 console.log('haha')
             },
            getAddress(data){
                  this.Address=data
                console.log(data)
            },

            addShoppingCar:async function (){
                //console.log(this.Address)
                if (JSON.stringify(this.Address)=='[]'){
                    console.log('请选择地址')
                    this.$message({
                        type: 'warning',
                        message: '请选择地址'
                    });
                }else {
                    this.$message({
                        type: 'success',
                        message: '加入购物车成功'
                    });
                    var result=await axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
                    console.log(result.data.data)
                    var ShopCar=result.data.data

                    var id=ShopCar.filter((item)=>{
                        return  item.id===this.product_details.message.goods_id
                    })

                    if (JSON.stringify(id)=='[]'){
                        var product={
                            id:this.product_details.message.goods_id,
                            title:this.product_details.message.goods_name,
                            price:this.product_details.message.goods_price,
                            img:this.product_details.message.goods_small_logo,
                            num:this.num,
                            user_id:parseInt(this.user_id
                            )
                        }
                           var result2=await axios.post('/addProduct',product)
                           console.log(result2.data)
                            //var addAdress=await  axios.post('/AddAdress',{Address:JSON.stringify(this.Address),username:this.username})
                           // console.log(addAdress)

                        //window.localStorage.setItem('shoppingCar',JSON.stringify(ShopCar))
                        var result4=await  axios.get('/getShoppingCar',{params:{user_id:this.user_id}})
                        this.changess(result4.data.data.length)


                    }
                    else {
                        console.log(this.num)
                               var result5=await  axios.get('/getProductNum',{params:{id:this.product_details.message.goods_id}})
                        console.log(result5.data)
                           console.log(result5.data.data.num)
                            var product_num=result5.data.data.num+this.num
                              var result3=await  axios.post('/upDataProduct',{num:product_num,id:this.product_details.message.goods_id})
                          console.log(result3.data)
                       // window.localStorage.setItem('shoppingCar',JSON.stringify(ShopCar))
                    }


                }
               // console.log(JSON.parse(window.localStorage.getItem('shoppingCar')))

            },

            getNum:function(value){
                this.num=value
                console.log(value)
            },

            home:function () {
                  this.$router.push({name:'home',params:{username:this.username,user_id:this.user_id}})

            },
        click_left:function () {
                if (this.imgList.length<10 &&this.imgList.length>4){
                    this.a++
                    this.$refs.ul.style.position='relative'
                    $('.imgs').animate({right: 288+'px',},800)
                    //console.log(this.a)

                }


        },
            click_right:function () {
                this.b++
                   if (this.$refs.ul.style.right>287+'px' ){
                       this.$refs.ul.style.position='relative'
                       $('.imgs').animate({right:0},800)
                       this.a--
                       //console.log(this.b)
                   }
            },
            bigImg:function (index) {
                   this.$refs.bigImgs.src=this.imgList[index].pics_big

                //console.log(this.imgList[index].pics_big)

                for (var i=0;i<this.imgList.length;i++){
                    if (i==index){
                        this.$refs.li[index].className='is-active'
                    }
                    else {
                        this.$refs.li[i].className='no-active'
                    }
                }
                //console.log(index)


            },
            change:function () {
         console.log('haha')
            }
        }
    }

</script>

<style scoped>

    .empty{
        display: none;
    }
    .hh{
        margin-top: 50px;
        width: 750px;
    }
    .hh div{
         display: block;
    }
    .ww{
     display: flex;
        margin-left: 280px;

    }
    .ww div {
        display: none;
    }
    .introduce_one li{
        width: 120px;
         height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
        color:#666666 ;
    }
    .introduce_one{
        display: flex;
        flex-direction: row;
        background-color: #F7F7F7;
        border-bottom: #E4393C solid 1px;
    }
    .introduce{


    }
    .introduce_scroll{
        width: 988px;
        height: 48px;
        position: fixed;
        z-index: 999;
        top: 0;
          margin-left: 30px;
    }
    .introduce_{
        width: 988px;
        height: 48px;
     margin-left: 250px;

    }
    .content_four{
        display: flex;
        flex-direction: column;
    }
    .btns{
        color: #ffffff;
        background-color: #df3033;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 46px;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
    }
    .addShoppingCar{
        display: flex;
        flex-direction: row;
        margin-top: 300px;
        align-items: center;
    }
    .address_three{
        font-size: 12px;
        color: #999999;
        margin-left: 10px;
        font-weight: 700;
    }
    .address_tow{
        margin-left: 10px;
    }
    .address_one{
        font-size: 12px;
        color: #999999;
          margin-left: 10px;
    }
    .address{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        align-items: center;
    }
    .jianjia:hover{
        font-size: 12px;
        color:#E4393C;
        margin-left: 10px;
        font-weight: bold;
        margin-top: 8px;
        cursor: pointer;
    }
    .jianjia{
        font-size: 12px;
        color: #005AA9;
        margin-left: 10px;
        font-weight: bold;
        margin-top: 8px;
        cursor: pointer;
    }
    .price{
        color: #e4393c;
        font-size: 22px;
        font-weight: bold;
        margin-left: 10px;
        cursor: default;
    }
   .product_Price{
       display: flex;
       flex-direction: row;
       background-color: #F3F3F3;
       width: 738px;
       height: 47px;
       align-items: center;
       margin-top: 20px;
   }
    .title_one{
        font: 700 16px Arial,"microsoft yahei";
        color: #666;
        padding-top: 10px;
        line-height: 28px;
        margin-bottom: 5px;
    }
.introduce{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-top: 30px;
}
   .imgs li{
       width: 53px;
       height: 53px
   }
       .no-active{
           width: 53px;
           height: 53px;
       }
    .is-active{
        width: 53px;
        height: 53px;
        border: 2px solid #E4393C;

    }
    .imgs{
        display: flex;
        width: 2000px;
        height: 53px;
        flex-direction: row;
    }
    .right{
        display: flex;
        background: url(//static.360buyimg.com/item/unite/1.0.152/components/default-soa/preview/i/disabled-prev.png) no-repeat;
        width: 22px;
        height: 53px;
         margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
    .left{
        display: flex;
        background: url(//static.360buyimg.com/item/unite/1.0.152/components/default-soa/preview/i/disabled-next.png) no-repeat;
        width: 22px;
        height: 53px;
        margin-top: 10px;
        margin-left: 10px;
        cursor: pointer;

    }
    .arrow{
        display: flex;
        flex-direction: row;
        height: 57px;
        margin-top: 30px;
    }
    .img{
        width:353px ;
        height: 351px;
        border: 1px solid #EEEEEE;
    }
    .product_img{
        margin-top: 10px;
        margin-left: 150px;
        width: 352px;
        height: 535px;

    }
    .content_three{
        display: flex;
        flex-direction: row;
    }
    .content_tow span i{

    }
.content_tow_one{
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 130px;
}
    .content_tow span a:hover{
        color:#E4393C ;
        margin-left: 5px;
    }
    .content_tow span a{
        color:#666666 ;
        margin-left: 5px;
    }
    .content_tow span{
        cursor: pointer;
        margin-left: 15px;
    }
    .shop{
        background-color:#E4393C ;
        color: #f4f4f4;
        width: 30px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content_tow{

        font-size: 12px;
        background-color: #E3E4E5;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        margin-top: 40px;
    }
    .shoppCar{

        width: 132px;
        height: 40px;
        background-color:#ffffff;
        border: 1px solid #EEEEEE;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
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
    .content_one{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }
    .ipt{
        width: 500px;
        border: 1px solid #E1251B;
        text-indent:10px;
        height: 40px;
         outline: none;

    }
    .search{
        display: flex;
        flex-direction: row;
        margin-left: 400px;
    }



    .black:hover{
        color: #E1251B;
        cursor:pointer;
    }
    .black{
        color: #999999;
        cursor:pointer;
    }
    .main{
        padding: 0px;
        overflow: hidden;

    }
    .header{
        background-color:#E3E4E5 ;
        height: 30px;
    }
    *{
        margin: 0;
        padding: 0;
    }
</style>