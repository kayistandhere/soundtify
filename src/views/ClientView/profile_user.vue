<template>
  <div class="container-fruid bg-module text-white">
    <navbar-first></navbar-first>
    <!-- Profile Edit -->
    <section class="mt-5 p-2">
      <div class="d-flex text-white align-items-end custom-cursor" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img
          src="../../assets/Images/Artists/SonTung.jpg"
          class="m-2 custom-img-animation"
          alt=""
          srcset=""
        />
        <div class="ms-2">
          <span class="fs-9">Profile</span>
          <h1 class="custom-text-title fw-bolder">Kayi Stand Here</h1>
          <span class="fs-8">Avicii , Mck and more </span>
          <div class="d-flex align-items-center">
            <span class="fs-8">Soundtify</span
            ><span class="material-symbols-rounded fs-8 p-2">blur_on</span>
            <span class="fs-8 mx-2">3 Playlist</span>
            <span class="fs-8"> Folower : 2141</span>
          </div>
        </div>
      </div>
      <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered ">
            <div class="modal-content bg-module p-2">
                <div class="d-flex justify-content-around">
                <img src="../../assets/Images/Artists/SonTung.jpg" class="m-2 custom-img-animation" alt="" srcset="" width="220" height="220">
                <!-- Form edit your profile -->
                <div class="m-2">
                <form action="" class="text-white">
                    <div class="row p-2">
                        <div class="col-6">
                            <input type="text" name="text" class="form-control" placeholder="Kayi" autocomplete="off" v-model="formData.name"  @blur="Validator"/>
                        </div>
                        <div class="col-6">
                            <input type="text" name="text" class="form-control" placeholder="levinhthuan1604@gmail.com" autocomplete="off" v-model="formData.email"  @blur="Validator"/>

                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-10">
                            <input type="text" name="text" class="form-control" placeholder="0971053741" autocomplete="off" v-model="formData.phone"  @blur="Validator"/>
                        </div>
                        <div class="col-2">
                            <div class="dropdown">
                                <button class="btn bg-module-1 text-white dropdown-toggle px-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ this.sexText }}
                                </button>
                                <ul class="dropdown-menu bg-module-1" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item text-white" @click="checkSex(true)">Male</a></li>
                                    <li><a class="dropdown-item text-white" @click="checkSex(false)">Female</a></li>
                                </ul>
                                </div>

                        </div>
                    </div>
                    <div class="row p-2">
                        <div class="col-12 d-flex">
                          <div class="col-10">
                            <input type="password" name="password" class="form-control" placeholder="*********" autocomplete="off" v-model="formData.password"  @blur="Validator"/>

                          </div>
                          <div class="col-2">
                            <router-link :to="'/'" class="txt-green ms-2 text-decoration-none ms-4 fs-8">Change</router-link>
                          </div>
                        </div>
                    </div>
                    <div class="d-flex p-2 justify-content-end">
                            <button-lg-radius :customContent="backText"></button-lg-radius>
                            <button-md-radius :customContent="saveText" type="submit"></button-md-radius>
                    </div>
                    <div class="row">
                        <p class="fs-9 text-secondary">By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
                    </div>
                </form>
            </div>
            </div>
            </div>
           
        </div>
        </div>
    </section>
    <!-- Artists Top -->
    <section class="mt-5 p-2">
      <div class="d-flex justify-content-between mx-2">
        <span class="fs-4 fw-bolder text-white"
          ><a class="custom-text-link" href="#">Top Artists</a></span
        >
        <span class="fs-9 fw-bold"
          ><a class="custom-text-link" href="#">show all</a></span
        >
      </div>
      <div class="d-flex">
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
        <card-items-artists></card-items-artists>
      </div>
    </section>
    <section class="mt-5 p-2">
      <div class="d-flex justify-content-between mx-2">
            <span class="fs-4 fw-bolder text-white"
              ><a class="custom-text-link" href="#">Top Song</a></span
            >
          </div>
        <div class="">
          <table-items-border></table-items-border>
        </div>
    </section>
    <section>
      <div class="mx-2">
          <div class="d-flex justify-content-between mx-2">
            <span class="fs-4 fw-bolder text-white"
              ><a class="custom-text-link" href="#">Top Albums</a></span
            >
          </div>
          <div class="d-flex">
            <card-items-song></card-items-song>
            <card-items-song></card-items-song>
            <card-items-song></card-items-song>
          </div>
        </div>
    </section>
    <section>
        <footer-1></footer-1>
    </section>
  </div>
</template>
<script>
import cardItemsArtists from "../../components/card/card_item_artists.vue";
import cardItemsSong from "../../components/card/card_item_song.vue";
import navbarFirst from "../../components/navbar/navbar_fisrt.vue";
import tableItemsBorder from "../../components/table/table_items_border.vue";
import footer1 from "../../components/footer/footer_1.vue";
import buttonLgRadius from "../../components/button/button_lg-radius.vue"
import buttonMdRadius from "../../components/button/button_md_radius.vue";
export default {
  name: "Profile",
  components: {
    navbarFirst,
    cardItemsArtists,
    cardItemsSong,
    tableItemsBorder,
    buttonMdRadius,
    buttonLgRadius,
    footer1,
  },
  data(){
    return {
        formData: {
            name: "Kayi",
            email: "levinhthuan1604@gmail.com",
            phone: 0,
            sex: true,
            password: "ádasdasda", 
        },
        backText: "Back",
        saveText: "Save",
        sexText : "Male",
    }
  },
  methods:{
    checkSex(value){
        if(value){
            this.formData.sex = true;
            this.sexText = "Male"
        }else {
            this.formData.sex = false;
            this.sexText = "Female"
        }
    }
  }
};
</script>

<style scoped>
.custom-text-title {
  font-size: 72px;
}
.custom-img-animation {
  width: 250px;
  height: 250px;
  border-radius: 50%;
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
.form-control {
  background-color: var(--color-gray1);
  color : #fff;
  border: none;
}
</style>
