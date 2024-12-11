<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">City Detail View</h1>
    <h2>{{ localPOI.name }}</h2>
    <p>{{ localPOI.description }}</p>
    <p>{{ localPOI.googleMapsUrl }}</p>
  </div>
</template>

<script setup lang="ts">
import { usePointOfInterestStore } from '@/stores/pointOfInterest'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pointOfInterestStore = usePointOfInterestStore()
const localPOI = computed(() => pointOfInterestStore.poi)

onBeforeMount(async () => {
  const pointOfInterestId = Number(route.params.id)
  await pointOfInterestStore.getPointOfInterestById(pointOfInterestId)
  console.log(pointOfInterestStore.poi)
})
</script>
