<template>
    <div class="bg-module">
        <navbar-fist></navbar-fist>
        <div class="container text-white">
            <div class="row m-0">
                <div class="col-md-7 col-12">
                    <div class="row">
                        <div class="col-12 mb-4">
                            <div class="row">
                                <div class=" border-0 col-lg-12">
                                    <img src="../../assets/Images/Background/prenium.jpg" class="custom-img-card"
                                        alt="..." />
                                    <div class="bg-module py-3">
                                        <h5 class="card-title">{{ subscriptionPlansData.name }}</h5>
                                        <ul class="">
                                            <li class="d-flex align-items-center py-2" :key="Des"
                                                v-for="Des in subscriptionPlansData.descriptions">
                                                <span
                                                    class="material-symbols-rounded txt-green me-3">done</span><span>{{
                                                    Des
                                                    }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 px-0">

                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-12 ps-md-5 p-0 ">
                    <div class="box-left">
                        <p class="textmuted h8">Invoice</p>
                        <div class="h8">
                            <div class="row m-0 border mb-3">
                                <div class="col-6 h8 pe-0 ps-2">
                                    <p class="textmuted py-2">Items</p> <span class="d-block py-2 border-bottom">Legal
                                        Advising</span> <span class="d-block py-2">Expert Consulting</span>
                                </div>
                                <div class="col-2 text-center p-0">
                                    <p class="textmuted p-2">Qty</p> <span class="d-block p-2 border-bottom">1</span>

                                </div>
                                <div class="col-2 p-0 text-center h8 border-end">
                                    <p class="textmuted p-2">Time</p> <span class="d-block border-bottom py-2"><span
                                            class="fas fa-dollar-sign"></span>{{ subscriptionPlansData.type }}</span>
                                </div>
                                <div class="col-2 p-0 text-center">
                                    <p class="textmuted p-2">Price</p> <span class="d-block py-2 border-bottom"><span
                                            class="fas fa-dollar-sign"></span>{{ subscriptionPlansData.price }}</span>
                                </div>
                            </div>
                            <div class="d-flex h7 mb-2">
                                <p class="">Total Amount</p>
                                <p class="ms-auto text-center">{{ subscriptionPlansData.price }} vnd</p>
                            </div>
                        </div>
                        <div class="">

                            <div class="form">
                                <div id="payment-container"></div>
                                <div class="d-flex align-items-center py-3">
                                    <div class="py-2 px-5  d-flex justify-content-end">
                                        <router-link :to="'/upgradePackage'"
                                            class="btn custom-text-link fs-6">Back</router-link>
                                    </div>
                                    <button-md-radius :customContent="payment" class="col-6"
                                        @click="pay"></button-md-radius>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-1></footer-1>
    </div>
</template>

<script>
// import cardPayment from '../../components/card/card-payment.vue'
import footer1 from '@/components/footer/footer_1.vue';
import navbarFist from '@/components/navbar/navbar_fisrt.vue';
import buttonMdRadius from '@/components/button/button_md_radius.vue';
import { createPaymentIntent } from '@/service/payment_service/payment';
import { loadStripe } from '@stripe/stripe-js'
import { getSubPlantById, getUserById } from '@/firebase/fireStore/fireQuery';
import firebase from '@/firebase';
import { mapState } from 'pinia';
import { useAuthStoreStore } from '@/store/authStore';
import { useToast } from 'vue-toastification';

export default {
    components: {
        navbarFist,
        footer1,
        buttonMdRadius
    },
    data() {
        return {
            subscriptionPlansData: {},
            stripeLoaded: false,
            stripe: null,
            elements: null,
            userPayment : null,
            payment: "payment"
        };
    },
    async created() {
        this.initPayment();
    },
    methods: {
        async initPayment() {
            try{
                const subData = this.$route.query.id;
            getSubPlantById(subData).then((res) => {
                this.subscriptionPlansData = res;
            }).catch((error) => {
                console.log(error);
            })
            const paymentIntent = await createPaymentIntent({
                price: this.$route.query.price,
                currency: this.$route.query.currency,
                id: this.$route.query.id,     
            }, this.user);

            this.stripe = await loadStripe("pk_test_51P12gMRv6DqQwfzyu9TjKKrn0UHthbuT99e4ADBzFBR5YSkzFonvow0jqelkp9CTqcDco0MNbJackNo5FDubYW2Y00ETgXAAcJ".toString());
            this.elements = this.stripe.elements({ clientSecret: paymentIntent.client_secret });
            const payElement = this.elements.create('payment', {
                classes: {
                    /// Style cho cái form nhập thẻ ở đây
                    base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-100 ease-in-out'
                }
            });
            payElement.mount('#payment-container');
            this.stripeLoaded = true;
            }catch(error) {
                const toast = useToast();
                toast.error(`Please Try Again : ${error}`);
                this.$router.push({path : '/upgradePackage'});
            }0
            
        },
        async pay() {
            const data = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    /// Tạo một trang để nhận kết quả
                    return_url: 'http://localhost:8080/paymentResult'
                }

            });
        },

    },
    computed: {
        ...mapState(useAuthStoreStore , ['user']),

        pk: `${process.env.VUE_APP_STRIPE_PUBLIC_KEY}`
    }
}
</script>

<style scoped>
.form-control {
    height: 25px;
    width: 150px;
    border: none;
    border-radius: 0;
    font-weight: 800;
    padding: 0 0 5px 0;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    margin: 0;
    font-size: 14px;
}

.form-control:focus {
    box-shadow: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
}

.form-control2 {
    font-size: 14px;
    height: 20px;
    width: 55px;
    border: none;
    border-radius: 0;
    font-weight: 800;
    padding: 0 0 5px 0;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    margin: 0;
}

.form-control2:focus {
    box-shadow: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
}

.form-control3 {
    font-size: 14px;
    height: 20px;
    width: 30px;
    border: none;
    border-radius: 0;
    font-weight: 800;
    padding: 0 0 5px 0;
    background-color: transparent;
    box-shadow: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    margin: 0;
}

.form-control3:focus {
    box-shadow: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
}

p {
    margin: 0;
}

img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.text-muted {
    font-size: 10px;
}

.textmuted {
    color: #6c757d;
    font-size: 13px;
}

.fs-14 {
    font-size: 14px;
}

.btn.btn-primary {
    width: 100%;
    height: 55px;
    border-radius: 0;
    padding: 13px 0;
    background-color: black;
    border: none;
    font-weight: 600;
}

.btn.btn-primary:hover .fas {
    transform: translateX(10px);
    transition: transform 0.5s ease
}


.fw-900 {
    font-weight: 900;
}

::placeholder {
    font-size: 12px;
}

.ps-30 {
    padding-left: 30px;
}

.h4 {
    font-family: 'Work Sans', sans-serif !important;
    font-weight: 800 !important;
}

.textmuted,
h5,
.text-muted {
    font-family: 'Poppins', sans-serif;
}

.custom-img-card {
    height: 200px;
    border-radius: 10px;
}
</style>