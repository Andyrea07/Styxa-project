import { defineStore } from 'pinia'
import type { Country } from '@/types/country'

export const useCountryStore = defineStore('country', {
  state: () => ({
    country: [] as Country[],
    countries: {} as Country,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },
    async getCountry() {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:3002/country')
        const data = await response.json()
        if (data) {
          this.country = data
        }
      } catch (error) {
        console.error('Error getting countries: ', error)
      } finally {
        this.isLoading = false
      }
    },
    async getCountryById(id: number) {
      try {
        const response = await fetch(`http://localhost:3002/country/${id}`)
        const data = await response.json()
        if (data) {
          this.countries = data[0]
        }
      } catch (error) {
        console.error('Error getting countries: ', error)
      }
    },
    async addCountry(country: Partial<Country>) {
      try {
        const response = await fetch('http://localhost:3002/country', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(country),
        })
        const data = await response.json()
        if (data) {
          this.country.push(data)
        }
      } catch (error) {
        console.error('Error adding a new country: ', error)
      }
    },
  },
})
