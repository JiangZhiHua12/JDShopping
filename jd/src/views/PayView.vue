<template>
    <div ref="div_">
    </div>
</template>

<script>
    //import axios from '@/axios'
    export default {
        name: "PayView",
        data(){
            return {
              data:''
            }
        },
  async created() {
            this.data=JSON.parse(this.$route.params.data)
            console.log(this.data.data)

   },
        mounted() {
                this.$refs.div_.innerHTML=this.data.data
            console.log('haha')
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>