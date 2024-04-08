<template>
 <div class="container-fluid bg-module text-white">
    <div class="d-flex">
        <div class="p-2 col-lg-6">
            <h3>CÁDIHASPODUHA</h3>
            <div class="container"></div>
        <audio src="../../assets/musicDemo/NangChenTieuSau.mp3" id="testSong"></audio>
        </div>
        <div class="p-2 col-lg-6">
            <form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Title Track</label>
    <input type="text" class="form-control" id="inputEmail4">
  </div>
  <div class="col-md-6">
    <label for="inputState" class="form-label">Artist</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>Sơn Tùng</option>
      <option>RPT MCK</option>
      <option>Độ Mixi</option>
    </select>
  </div>
  <div class="col-10">
    <label for="inputAddress" class="form-label">Albums</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Compoter</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Albums</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-12">
    <label for="inputState" class="form-label">Category</label>
    <select id="inputState" class="form-select">
      <option selected>Choose category</option>
      <option>Pop</option>
      <option>Jazz</option>
      <option>Rock</option>
    </select>                    
  </div>
  <div class="col-md-8">
    <label for="inputCity" class="form-label">Cover Artist</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">subtotal</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
      <option>...</option>
      <option>...</option>
    </select>
  </div>
  
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12 d-flex">
    <button-lg-radius :customContent="cancel"></button-lg-radius>
    <button-md-radius :customContent="create" class="mx-3"></button-md-radius>
  </div>
</form>
        </div>
    </div>
 </div>
</template>

<script>
import buttonLgRadius from '@/components/button/button_lg-radius.vue';
import buttonMdRadius from '@/components/button/button_md_radius.vue';
import sideBar from '../../components/sidebar/sidebar.vue'
// import AudioMotionAnalyzer from 'audiomotion-analyzer';
export default {
    data(){
        return {
            create : "Create",
            cancel : "Cancel"
        }
    },
    components:{
        sideBar,
        buttonMdRadius,
        buttonLgRadius
    },
    computed:{
        
    },
    watch:{
        
    }
}
</script>

<style>

</style>