import { defineStore } from 'pinia'
import type { PointOfInterest } from '@/types/pointOfInterest'

export const usePointOfInterestStore = defineStore('pointofinterest', {
  state: () => ({
    pointOfInterest: [] as PointOfInterest[],
    poi: {} as PointOfInterest,
    isLoading: false,
  }),
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },
    async getPointOfInterest(): Promise<void> {
      try {
        this.isLoading = true
        const response = await fetch('http://localhost:3002/pointofinterest')
        const data = await response.json()
        console.log('Meghivja a datat', data)
        if (data) {
          this.pointOfInterest = data
        }
      } catch (error) {
        console.error('Error getting point of interest: ', error)
      } finally {
        this.isLoading = false
      }
    },
    async getPointOfInterestById(id: number) {
      try {
        const response = await fetch(`http://localhost:3002/pointofinterest/${id}`)
        const data = await response.json()
        if (data) {
          this.poi = data[0]
        }
      } catch (error) {
        console.error('Error getting Interest point: ', error)
      }
    },

    async addPointOfInterest(pointOfInterest: Partial<PointOfInterest>) {
      try {
        const response = await fetch('http://localhost:3002/pointofinterest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pointOfInterest),
        })
        const data = await response.json()
        if (data) {
          console.log('New interest point added: ', data)
        }
      } catch (error) {
        console.error('Error adding a new interest point: ', error)
      }
    },
  },
})
