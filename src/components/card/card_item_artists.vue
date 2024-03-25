<template>
    <div class="card custom-bg-card m-2" style="width: 12rem;">
      <img src="../../assets/Images/Artists/Tlinh.jpg" class="custom-img-thumbnail p-2" alt="...">
      <div class="p-2">
              <h5 class="card-title fs-6 fw-bolder text-white">Pop Rising Vietnam</h5>
              <p class="two-lines fs-8">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <div class="custom-btn-position">
        <div class="custom-btn-play">
        <i class="bi bi-play-fill fs-2 text-dark ms-1"></i>
        </div>
    </div>
  </div>
  </template> 
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .custom-img-thumbnail {
      width: 100%;
      height: 180px;
      border-radius: 50%;
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