<template>
  <div class="bg-module">
    <section>
    <div class="col-4 px-5 py-2">
      <search-track></search-track>
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
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Brower all</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
    <card-albums></card-albums>
  </section>
  </div>

</template>

<script>
import cardAlbums from "../../components/card/card_albums.vue"
import searchTrack from "../../components/search/search_basic.vue"
import cardItemArtists from '../../components/card/card_artists_albums.vue'

export default {
    components: {
        cardAlbums,
        searchTrack,
        cardItemArtists
    }
}
</script>

<style>

</style>