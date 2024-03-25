<template>
  <div class="d-flex position-relative custom-search">
    <input type="text" class="custom-input-search bg-module-1" placeholder="Bạn muốn phát nội dung gì?" v-model="this.searchData">
    <span class="material-symbols-rounded position-absolute start-0 ms-2 mt-2 ">search</span>
    <span class="material-symbols-rounded position-absolute end-0 me-2 mt-2" @click="clearData">close</span>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchData: "",
        }
    },
    methods:{
        clearData(){
            this.searchData = "";
        }
    },

}
</script>

<style scoped>
.custom-input-search {
    width: 100%;
    border-radius: 24px;
    padding: 10px 12px 10px 40px;
    border: none;
    outline:invert #fff;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
}
.custom-search {
    color: gray;
    opacity: 0.8;
    transition: 0.5s ease;
    border: none;
}
</style>