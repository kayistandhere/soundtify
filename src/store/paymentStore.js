import auth from '@/service/auth/auth'
import { createPaymentIntent } from '@/service/payment_service/payment';
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePaymentStoreStore = defineStore('paymentStore', {
  state: () => ({
    dataSubscription: {},
  }),
  getters: {
  },
  actions: {
    async subscribePlan(plan, user) {
      if(user == null) {
        return;
      }
      const paymentIntent = await createPaymentIntent(plan, user);
      return paymentIntent;
    },
    paymentDataSubscription(data){
      this.dataSubscription = data;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStoreStore, import.meta.hot))
}
