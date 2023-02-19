<template>

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
                            <span class="kks">{{item2.title}}</span>
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
</template>

<script>
    import axios from "@/axios";

    export default {
        name: "PaymentCom",
        data(){
            return{
                OrderList:[]
            }
        },
        created() {
            this.user_id=this.$store.state.user_id
            this.username=this.$store.state.username
            //调用我们的购物车数据
            //this.getProductNum()
            //调用我们的订单数据
            this.getOrder()

        },
        methods:{
            async getOrder(){
                var result=await axios.get('/getOrder',{params:{user_id:this.user_id}})
                console.log(result.data.data)
                this.OrderList=result.data.data
                console.log('待付款')
                var payment=this.OrderList.filter((item)=>{
                    return  item.status!=='true'
                })
                this.OrderList=payment
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
        }
    }
</script>

<style scoped>

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
</style>