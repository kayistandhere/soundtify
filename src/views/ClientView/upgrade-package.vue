<template>
    <div class="d-flex">
        <card-payment class="mt-5"></card-payment>
        <card-payment class="mt-5"></card-payment>
    </div>
 
  <footer_1 class="mt-5"></footer_1>

</template>

<script>
import footer_1 from '@/components/footer/footer_1.vue';
import cardPayment from '../../components/card/card-payment.vue'
export default {
    components:{
        cardPayment,
        footer_1
    }
}
</script>

<style>

</style>