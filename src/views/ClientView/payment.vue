<template>
    <div class="bg-module">
        <navbar-fist></navbar-fist>
        <div class="container rounded bg-module text-white">
            <div class="row d-flex justify-content-center pb-5">
                <div class="col-sm-5 col-md-5 ml-1">
                    <div class="py-4 d-flex flex-row">
                        <h5><b>STRIPE</b> | </h5><span class="pl-2">Pay</span>
                    </div>
                    <div class="card border-0 m-2 col-lg-12">
                        <img src="../../assets/Images/Background/prenium.jpg" class="custom-img-card" alt="..." />
                        <div class="card-body bg-module">
                            <h5 class="card-title">{{ subscriptionPlansData.name }}</h5>
                            <ul class="">
                                <li class="d-flex align-items-center" :key="Des"
                                    v-for="Des in subscriptionPlansData.descriptions">
                                    <span class="material-symbols-rounded txt-green me-3">done</span><span>{{ Des
                                        }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex bg-module">
                            <h5 class="card-text">{{ subscriptionPlansData.price }} {{ subscriptionPlansData.currency }}
                                / {{ subscriptionPlansData.type }}</h5>
                        </div>
                    </div>
                    <hr>
                    <div class="pt-2">
                        <div class="d-flex">
                            <div>
                                <p><b>Patient Balance.</b><span class="green">$13.24</span></p>
                            </div>
                            <div class="ml-auto p-2">
                                <p class="text-primary"><i class="fa fa-plus-circle text-primary"></i>Add payment card
                                </p>
                            </div>
                        </div>
                        <p>
                            This is an estimate for the portion of your order (not covered by insurance) due
                            today . once insurance finalizes their review refunds and/or balances will reconcile
                            automatically.
                        </p>
                        <form class="pb-3">
                            <div class="d-flex flex-row align-content-center">
                                <div class="pt-2 pr-2"><input type="radio" name="radio1" id="r1" checked></div>
                                <div class="rounded border d-flex w-100 px-2">
                                    <div class="pt-2">
                                        <p><i class="fa fa-cc-visa text-primary pr-2"></i>Visa Debit Card</p>
                                    </div>
                                    <div class="ml-auto pt-2">************3456</div>
                                </div>
                            </div>
                        </form>
                        <form class="pb-3">
                            <div class="d-flex flex-row w-100">
                                <div class="pt-2 pr-2"><input type="radio" name="radio2" id="r2"></div>
                                <div class="rounded  d-flex w-100 px-2">
                                    <div class="pt-2">
                                        <p><i class="fa fa-cc-mastercard pr-2"></i>Mastercard Office</p>
                                    </div>
                                    <div class="ml-auto pt-2">************1038</div>
                                </div>
                            </div>
                        </form>
                        <div>
                            <div id="payment-container"></div>
                            <input type="button" value="Proceed to payment" class="btn btn-primary btn-block"
                                @click="pay">
                        </div>
                    </div>
                </div>
                <div class=" col-sm-3 col-md-4 offset-md-1 mobile bg-module-1">
                    <div class="py-4 d-flex justify-content-end">
                        <router-link :to="'/upgradePackage'" class="custom-text-link">Back</router-link>
                    </div>
                    <div class="bg-module-1 rounded d-flex flex-column">
                        <div class="p-2 ml-3">
                            <h4>Order Recap</h4>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Contracted Price</div>
                            <div class="ml-auto">$186.76</div>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Amount toward deductible</div>
                            <div class="ml-auto">$0.00</div>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Coinsurance( 0% )</div>
                            <div class="ml-auto">+ $0.00</div>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Copayment</div>
                            <div class="ml-auto">+ $40.00</div>
                        </div>
                        <div class="border-top px-4 mx-3">
                        </div>
                        <div class="p-2 d-flex pt-3">
                            <div class="col-8">Total Deductible, Coinsurance, and Copay</div>
                            <div class="ml-auto">$40.00</div>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Maximum out-of-pocket on Insurance Policy (not reached)</div>
                            <div class="ml-auto">$6500.00</div>
                        </div>
                        <div class="border-top px-4 mx-3"></div>
                        <div class="p-2 d-flex pt-3">
                            <div class="col-8">Insurance Responsibility</div>
                            <div class="ml-auto"><b>$71.76</b></div>
                        </div>
                        <div class="p-2 d-flex">
                            <div class="col-8">Patient Balance <span
                                    class="fa fa-question-circle text-secondary"></span></div>
                            <div class="ml-auto"><b>$71.76</b></div>
                        </div>
                        <div class="border-top px-4 mx-3"></div>
                        <div class="p-2 d-flex pt-3">
                            <div class="col-8"><b>Total</b></div>
                            <div class="ml-auto"><b class="green">$85.00</b></div>
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
import { createPaymentIntent } from '@/service/payment_service/payment';
import { StripeElements, StripeElement} from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export default {
    components: {
        navbarFist,
        // cardPayment,
        footer1,
    },
    data() {
        return {
            subscriptionPlansData: {},
            stripeLoaded: false,
            stripe: null,
            elements: null,
        };
    },
    async created() {
        // getSubPlantById(this.dataSubscription.id).then((res) => {
        //     this.subscriptionPlansData = res;
        //     console.log("check data =" , res);
        // }).catch((error) =>{
        //     console.log(error);
        // })
        // elements.create('payment');
        this.initPayment();
        
    },
    methods: {
        async initPayment() {
            const paymentIntent = await createPaymentIntent({
                price: 100000,
                currency: "vnd",
                id: "asdsfwnek"
            }, this.user);

            this.stripe = await loadStripe("pk_test_51P12gMRv6DqQwfzyu9TjKKrn0UHthbuT99e4ADBzFBR5YSkzFonvow0jqelkp9CTqcDco0MNbJackNo5FDubYW2Y00ETgXAAcJ".toString());
            this.elements = this.stripe.elements({clientSecret: paymentIntent.client_secret});
            const payElement = this.elements.create('payment', {
                classes: {
                    /// Style cho cái form nhập thẻ ở đây
                    base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
                }
            });
            payElement.mount('#payment-container');
            this.stripeLoaded = true;
        },
        async pay() {
            console.log("Submit");
            const data = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    /// Tạo một trang để nhận kết quả
                    // return_url: 'http://localhost:8080/success'
                }
               
            });
            console.log(data);
        },

        async getPaymentData() {
            try {
                console.log(this.dataSubscription);
                const response = await this.axios.post('https://api.stripe.com/v1/payment_intents', {
                    amount: this.dataSubscription.price,
                    currency: this.dataSubscription.currency,
                }, {
                    headers: {
                        Authorization: `Bearer ${process.env.VUE_APP_STRIPE_SECRET_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                console.log(response.data); // Access the response data
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        }
    },
    computed: {
        // ...mapState(useAuthStoreStore, ['user']),
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
.custom-img-card{
    height: 100px;
}
</style>