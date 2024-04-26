<template>
    <div class="card bg-transparent custom-bg-card m-2 border-0" style="width: 12rem;" v-if="isCard">
      <img src="../../assets/Images/Artists/Tlinh.jpg" class="custom-img-thumbnail p-2" alt="...">
      <div class="p-2">
              <h5 class="card-title fs-6 fw-bolder text-white text-start">Tlinh</h5>
              <p class="text-white fs-8">Nghệ sĩ</p>
      </div>
      <div class="custom-btn-position">
        <div class="custom-btn-play">
        <i class="bi bi-play-fill fs-2 text-dark ms-1"></i>
        </div>
    </div>
    <span class="material-symbols-rounded position-absolute end-0 text-secondary" @click="removeCard">close</span>
  </div>
  
  </template> 
  
  <script>

  export default { 
    data(){
        return {
            albums: "",
            isCard : true,
        }
    },
    methods:{
        removeCard(){
            this.isCard = false;
        }
    }
  }
  </script>
  
  <style scoped>
  .custom-img-thumbnail {
      width: 100%;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
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
    top:50%;
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