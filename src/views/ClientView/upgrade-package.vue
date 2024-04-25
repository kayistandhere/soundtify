<template>
    <div class="container-fluid bg-module">
        <navbar-fisrt></navbar-fisrt>
            <card-payment class="mt-5"></card-payment>
        <footer_1 class="mt-5"></footer_1>
    </div>
</template>
<script>
import navbarFisrt from '@/components/navbar/navbar_fisrt.vue';
import footer_1 from '@/components/footer/footer_1.vue';
import cardPayment from '../../components/card/card-payment.vue'
export default {
    components:{
        cardPayment,
        footer_1,
        navbarFisrt,
    }
}
</script>

<style>

</style>