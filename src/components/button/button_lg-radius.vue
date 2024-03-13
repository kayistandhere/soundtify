<template>
    <button class="custom-button" v-html="customContent"></button>
  </template>
  
  <script>
  export default {
      props: {
      customContent: String
    }
  }
  </script>
  
  <style scoped>
  .custom-button {
      border-radius: 30px;
      padding: 2px 10px 2px 10px;
      border: none;
      width: 70%;
      height: 3em;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background: var(--color-module);
  } 
  </style>