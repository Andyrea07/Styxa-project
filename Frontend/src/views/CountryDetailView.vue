<template>
  <div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-4xl font-bold">Country Detail View</h1>

    <h2>{{ localCountry.name }}</h2>
    <p>{{ localCountry.description }}</p>
    <p>{{ localCountry.latitude }}</p>
    <p>{{ localCountry.longitude }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCountryStore } from '@/stores/country'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const countryStore = useCountryStore()
const localCountry = computed(() => countryStore.countries)

onBeforeMount(async () => {
  const countryId = Number(route.params.id)
  await countryStore.getCountryById(countryId)
  console.log(countryStore.countries)
})
</script>
