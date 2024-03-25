<template>
    <div class="d-flex justify-content-center align-items-center custom-logo-radius">
        <i class="bi bi-google"></i>
        <button class="custom-button" v-html="customContent"></button>
        
    </div>
   
  </template>
  
  <script>
  export default {
      props: {
      customContent: String
    }
  }
  </script>
  <style scoped>
  .custom-logo-radius {
    border-radius: 30px;
      padding: 2px 10px 2px 10px;
      border: none;
      width: 70%;
      height: 3em;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background: var(--color-green);
  }
  .custom-button {
    color: #fff;
    background: var(--color-green);
    outline: none;
    border: none;
  }
  </style>