<template>
  <div class="d-flex position-relative custom-search">
    <input type="text" class="custom-input-search bg-module-1" id="dropSearch" data-bs-toggle="dropdown" placeholder="Bạn muốn phát nội dung gì?" v-model="this.searchData"
    @keyup.enter="searchByValue(this.searchData)">
    <span class="material-symbols-rounded position-absolute start-0 ms-2 mt-2 ">search</span>
    <span class="material-symbols-rounded position-absolute end-0 me-2 mt-2" @click="clearData">close</span>
    <div class="dropdown-menu bg-module rounded" aria-labelledby="dropSearch"  style="z-index:100;">
        <div class="d-flex" :key="tag" v-for="tag in tags">
            <a href="#">{{ tag.name }}</a>
        </div>
        <div class="fs-5" v-if="!isLoading">
            <card-item-song :array-song="this.searchValue.id"></card-item-song>
        </div>
    </div>
  </div>
</template>

<script>
import { getAllArtist, getAllTag, search } from '@/firebase/fireStore/fireQuery.js';
import cardItemSong from '../card/card_item_song.vue';
export default {
    components :{
        cardItemSong,
    },
    data(){
        return{
            searchData: "",
            tags : [],
            artists : [],
            searchValue : [],
            isLoading : true,
        }
    },
    created(){
        this.showDataSearch();
    },
    methods:{
        clearData(){
            this.searchData = "";
        },
        async showDataSearch(){
          this.tags = await getAllTag();
          this.artists = await getAllArtist();
          this.artists = this.artists.slice(0,5)
          this.tags = this.tags.slice(0,5);
        },
        searchByTag(value){
            Search(value).then((res) =>{
                console.log("song tag = ", res);
            })
        },
        
        async searchByValue(value){
            this.isLoading = true;
            console.log("check 1 = ", value);
          this.searchValue =  await search(value);
          console.log("check 2 =", this.searchValue);
          this.isLoading = false;
         
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