<template>
    <div class="d-block text-white">
        <div class="card border-0 m-2 col-lg-12" :key="card.id" v-for="card in subscriptionPlansData">
            <img src="../../assets/Images/Background/prenium.jpg" class="card-img-top custom-img-card" height="200"
                alt="..." />
            <div class="card-body bg-module">
                <h5 class="card-title">{{ card.name }}</h5>
                <ul class="">
                    <li class="d-flex align-items-center" :key="Des" v-for="Des in card.descriptions">
                        <span class="material-symbols-rounded txt-green me-3">done</span><span>{{ Des }}</span>
                    </li>
                    
                </ul>
               
               
            </div>
            <div class="card-footer d-flex bg-module">
                <h5 class="card-text">{{ card.price }} {{ card.currency }} / {{ card.type }}</h5>
                <button-md-radius class="d-block ms-auto text-dark" :customContent="select" @click="subscriptionPlansBuy(card)"></button-md-radius>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllSubscriptionPlans } from "@/firebase/fireStore/fireQuery";
import buttonMdRadius from "../button/button_md_radius.vue";
import { usePaymentStoreStore } from "@/store/paymentStore";
import { mapActions } from "pinia";
export default {
    components: {
        buttonMdRadius,
    },
    data() {
        return {
            select: "Select",
            subscriptionPlansData : {}
        };
    },
    created(){
        getAllSubscriptionPlans().then((res) =>{
            this.subscriptionPlansData = res;
        })
    },
    methods : {
        ...mapActions(usePaymentStoreStore , ["paymentStore"]),
        async subscriptionPlansBuy(data) {
           await this.paymentStore({
                "currency":data.currency,
                "price":data.price,
                "id" : data.id,
            });
            this.$router.push({name : "payment"})
        }
    }
    
};
</script>

<style scoped>
.custom-img-card {
    object-fit: cover;
}
</style>
