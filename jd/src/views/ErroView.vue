<template>
    <div ref="empty_" class="empty">
        <el-empty :description="empty">{{nums}}跳转首页</el-empty>
    </div>
</template>

<script>
    export default {
        name: "ErroView",
        data(){
            return{
                username:'',
                user_id:null,
                empty:'',
                nums:5,

            }
        },
        created() {
                  this.username=this.$route.params.username
                  this.user_id=this.$route.params.user_id
            console.log(this.username)
            console.log(this.user_id)
        }
        ,
        mounted() {
            this.empty = '您搜索的商品已下架'
            var num=5
            var that=this
            //console.log(this.nums)
            var clear=setInterval(function () {
                if (num==0){
                    that.$router.push({name:'home',params:{username:that.username,user_id:that.user_id}})
                    console.log('跳转成功')
                    //console.log(this.username)
                    clearInterval(clear)

                }else {
                    //this.nums=this.v--

                    //console.log(num--)
                    that.nums=num--
                    console.log(that.nums)
                   // console.log('niha')
                }
            }, 1000)

        },
        methods:{
            goBack:function(){


            },
        }
    }
</script>

<style scoped>

</style>