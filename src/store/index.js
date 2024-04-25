import { defineStore, acceptHMRUpdate } from 'pinia'

export const useIndexStore = defineStore('index', {
 state: () => ({
   songId: "",
 }),
 getters: {

 },
 actions: {
  songDetailId(data){
    this.songId = data;
}
 },
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useIndexStore, import.meta.hot))
}
