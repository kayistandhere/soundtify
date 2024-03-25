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
    font-size: 12px;
    color: #fff;
    background: #2A2A2A;
}
</style>