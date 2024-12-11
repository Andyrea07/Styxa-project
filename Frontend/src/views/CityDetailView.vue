<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">City Detail View</h1>
    <h2>{{ localCity.name }}</h2>
    <p>{{ localCity.description }}</p>
    <p>{{ localCity.population }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCityStore } from '@/stores/city'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const cityStore = useCityStore()

const localCity = computed(() => cityStore.city)

onBeforeMount(async () => {
  const cityId = Number(route.params.id)
  await cityStore.getCityById(cityId)
  console.log(cityStore.city)
})
</script>
