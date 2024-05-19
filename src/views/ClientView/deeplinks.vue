<template>
  <circle-loading></circle-loading>
</template>

<script>
import circleLoading from '@/components/circle_loading/circle_loading.vue'
export default {
    components:{
        circleLoading
    },
    created(){
        this.getParam();
    },
    methods:{
        getParam(){
            const query = this.$route.query;
            switch(query.mode) {
                case "resetPassword":
                    this.$router.push({path : "/resetPassword" , query : query})
                    break;
            }
        }
    }
}
</script>

<style >

</style>