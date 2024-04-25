import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePaymentStoreStore = defineStore('paymentStore', {
 state: () => ({
   dataSubscription : {},
 }),
 getters: {
 },
 actions: {
    paymentStore(data){
        this.dataSubscription = data
    }
 },
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(usePaymentStoreStore, import.meta.hot))
}
