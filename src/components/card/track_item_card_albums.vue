<template>
    <div class="custom_card d-flex align-items-center">
      <img class="custom_Img" src="../../assets/Images/Artists/SonTung.jpg" alt="" srcset="" width="50" height="50">
      <div>
          <p class=" fs-8 fw-bold">Sơn Tùng MTP</p>
          <p class=" fs-9 custom_LineHeight">Artists</p> 
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .custom_card {
    display: flex;
    padding: 5px 3px 5px 3px;
    border-radius: 5px;
    width : 100%;
  }
  .custom_Img {
    border-radius: 5px;
    object-fit: contain;
    margin-right: 5px;
  }
  .custom_LineHeight {
    line-height: 2px;
  }
  </style>