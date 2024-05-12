<template>
  <div class="bg-module px-2" style="height: 100vh;">
    <section>
    <div class="col-4 px-2 py-2">
      <div class="d-flex position-relative custom-search">
        <input type="text" class="custom-input-search bg-module-1" placeholder="Bạn muốn phát nội dung gì?"
            v-model="this.searchData" @keyup="searchByValue(this.searchData)">
        <span class="material-symbols-rounded position-absolute start-0 ms-2 mt-2 ">search</span>
        <span class="material-symbols-rounded position-absolute end-0 me-2 mt-2" @click="clearData">close</span>
        <div class="dropdown-menu bg-module rounded">
        </div>
    </div>
    </div>
  </section>
  <section>
    <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Recent searches</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
    <card-item-artists></card-item-artists>
  </section>
  <section>
    <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">The song you looking for is here</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex justify-content-start" v-if="!isLoading">
            <div class="card custom-bg-card m-2 position-relative text-white custom-cursor" style="width: 15rem;" :key="song.id" 
                v-for="song in searchValue"
                @click="redirectSongDetail(song.id,song.artistId)"
                > 
                <img :src="song.cover" class="custom-img-thumbnail p-2" alt="...">
                <div class="p-2">
                    <h5 class="card-title fs-6 fw-bolder text-white">{{ song.name }}</h5>
                    <p class="two-lines fs-8">{{ song.description }}</p>
                </div>
            </div>
    </div>
  </section>
  </div>
</template>

<script>
import cardAlbums from "../../components/card/card_albums.vue"
import cardItemArtists from '../../components/card/card_artists_albums.vue'
import { getAllArtist, getAllTag, search } from '@/firebase/fireStore/fireQuery.js';
export default {
    components: {
        cardAlbums,
        cardItemArtists
    },
    data() {
        return {
            searchData: "",
            tags: [],
            artists: [],
            searchValue: [],
            isLoading: true,
        }
    },
    created() {
        this.showDataSearch();
    },
    methods: {
        clearData() {
            this.searchData = "";
        },
        async showDataSearch() {
            this.tags = await getAllTag();
            this.artists = await getAllArtist();
            this.artists = this.artists.slice(0, 5)
            this.tags = this.tags.slice(0, 5);
        },
        async searchByTag(value) {
            await Search(value)
        },

        async searchByValue(value) {
            this.isLoading = true;
            this.searchValue = await search(value);
            console.log("data search", this.searchValue);
            this.isLoading = false;

        },
        async redirectSongDetail(id ,artist){
            const value = {
                "id":id,
                "artistId":artist
            }
           this.$router.push({path : `songdetail/` , query : value})
        },
    },
}
</script>

<style scoped>
/* search */
.custom-input-search {
    width: 100%;
    border-radius: 24px;
    padding: 10px 12px 10px 40px;
    border: none;
    outline: invert #fff;
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
/* custom card  */
.custom-img-thumbnail {
    width: 100%;
    height: 180px;
    border-radius: 15px;
    object-fit: cover;
}

.custom-bg-card {
    background-color: #1d1c1c;

}

.custom-btn-play {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17cf5b;
}

.custom-btn-position {
    position: absolute;
    left: 70%;
    top: 50%;
    display: none;
    transform: translate(-50% -50%);
    background-color: none !important;

}

.custom-bg-card:hover {
    background-color: #2b2b2b;
}
.custom-bg-card:hover .custom-btn-position {
    display: block;
}
</style>