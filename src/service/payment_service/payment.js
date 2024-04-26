import axios from "axios";

export const createPaymentIntent = async (plan, user) => {
    try {
        const response = await axios.post('https://api.stripe.com/v1/payment_intents',
            {
                'amount': `${plan.price}`,
                'currency': plan.currency,
                'customer': "cus_PvhxSKVnrv2eiZ", 
                'receipt_email': "anhk90443@gmail.com",
                'description': plan.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.VUE_APP_STRIPE_SECRET_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        if (response.status >= 400) {
            console.log(response.data);
            throw "Create payment error 222";
        }
        return response.data;
    } catch (error) {
        console.log("Error", error);
        throw "Create payment error";
    }
}