<template> 
    <div class="container-fluid text-white bg-module rounded" style="height: 200vh;">
        <navbar-fisrt></navbar-fisrt>
        <div class="d-flex text-white align-items-end">
            <img src="../../assets/Images/Artists/WrenEvan.jpg" class="rounded m-2 custom-img-animation" alt="" srcset="" width="220" height="220">
            <div class="ms-2">
                <span class="fs-9 ">Playlist</span>
                <h1 class="custom-text-title fw-bolder">Pop Mix</h1>
                <span class="fs-8">Avicii , Mck and more </span>
                <div class="d-flex align-items-center">
                    <span class="fs-8">Soundtify</span><span class="material-symbols-rounded fs-8 p-2">blur_on</span> <span class="fs-8">50 song, </span> <span class="fs-8"> about 2 hour 16 min</span>
                </div>
            </div>
        </div>
        <!-- function play -->
        <div class="d-flex justify-content-between align-items-center m-2">
            <div class="d-flex align-items-center">
                <div class="custom-btn-play mx-2">
                    <i class="bi bi-play-fill fs-3 text-dark ms-1"></i>
                </div>
                <span class="material-symbols-rounded fs-1 mx-4 txt-green">favorite</span>
                <span class="material-symbols-rounded fs-2 mx-2">more_horiz</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="fs-8 mx-1">List</span>
              <span class="material-symbols-rounded fs-5">format_list_bulleted</span>
            </div>
          </div>
          <!-- Table Music -->
          <section>
         <table-items-border></table-items-border>
          </section>
          <!-- Copy Right -->
          <section>
            
            <p class="fs-8">1 tháng 1, 2023</p>
            <p class="fs-9"><span class="material-symbols-rounded fs-9 px-2">copyright</span>2013 Avicii Music AB, / PRMD under exclusive license to Universal Music AB</p>
          </section>
          <!-- Albums for artists -->
          <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Popular artists</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex">
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
            </div>
          </section>
          
    </div>
</template>
<script>
import navbarFisrt from '../../components/navbar/navbar_fisrt.vue'
import tableItemsBorder from '../../components/table/table_items_border.vue'
import cardItemSong from '../../components/card/card_item_song.vue'
export default {
    components:{
        navbarFisrt,
        tableItemsBorder,
        cardItemSong
    }
}
</script>

<style>
.custom-text-title {
    font-size: 72px;
}
.custom-img-animation {
    transform: scale(100%);
    transition: 0.2s ease-in;
    z-index: 999;
}
.custom-img-animation:hover {
    transform: scale(102%);
}
.custom-btn-play {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17cf5b;
}
</style>