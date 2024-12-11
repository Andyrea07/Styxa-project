import {} from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: '',
    title: '',
  }),
  actions: {
    incrementCount() {
      this.count++
      console.log(this.count)
    },

    discrementCount() {
      this.count--
      console.log(this.count)
    },
  },
})
