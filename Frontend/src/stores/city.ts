import { defineStore } from 'pinia'
import type { City } from '@/types/city'

//get

export const useCityStore = defineStore('city', {
  state: () => ({
    cities: [] as City[],
    city: {} as City,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },
    async getCities() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:3002/cities')
        const data = await response.json()
        console.log('Cities response:', data)
        if (data) {
          this.cities = data
        }
      } catch (error) {
        console.error('Error getting cities: ', error)
      } finally {
        this.isLoading = false
      }
    },

    async getCityById(id: number) {
      try {
        const response = await fetch(`http://localhost:3002/cities/${id}`)
        const data = await response.json()
        if (data) {
          this.city = data[0]
        }
      } catch (error) {
        console.error('Error getting cities: ', error)
      }
    },

    async addCities(city: Partial<City>) {
      try {
        const response = await fetch('http://localhost:3002/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(city),
        })
        const data = await response.json()
        if (data) {
          this.cities.push(data)
        }
      } catch (error) {
        console.error('Error adding a new city: ', error)
      }
    },
  },
})
