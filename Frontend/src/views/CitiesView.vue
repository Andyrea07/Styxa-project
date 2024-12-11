<template>
  <div v-for="city in cityStore.cities" :key="city.id"></div>
  <div class="flex flex-col gap-y-4">
    <div class="flex w-full items-center justify-between">
      <h1 class="text-2xl font-semibold">Cities</h1>
      <BaseButton :type="ButtonType.PRIMARY" text="Add Cities" @click="isCreateModalOpen = true" />
    </div>
    <BaseTable
      :headers="citiesHeader"
      :data="cityStore.cities"
      @on-row-click="onCityTableRowClicked"
    />
  </div>

  <BaseModal
    :is-open="isCreateModalOpen"
    :is-primary-button-disabled="cityStore.isLoading"
    primary-button-text="Create"
    title="This is a modal title"
    description="Create a new city modal?"
    @on-close="closeCreateCitiesModal"
    @on-action-click="addNewCity"
  >
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10"
        >
          <component :is="HomeModernIcon" class="size-6 text-cyan-600" aria-hidden="true" />
        </div>

        <div class="flex flex-col gap-y-8 w-[300px]">
          <h1 class="text-3xl font-semibold text-gray-900 font-serif ml-3">Adding City</h1>
          <div class="flex flex-col gap-y-4 font-serif">
            <BaseInput
              v-model="newCities.name"
              :type="InputType.TEXT"
              label="Name"
              placeholder="Add city name..."
            />
            <BaseInput
              v-model="newCities.description"
              :type="InputType.TEXT"
              label="Description"
              placeholder="Add city description..."
            />
            <BaseInput
              v-model="newCities.population"
              :type="InputType.NUMBER"
              label="Population"
              placeholder="Add population of the city..."
            />
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseTable from '@/components/base/BaseTable.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { onBeforeMount, ref } from 'vue'
import { HomeModernIcon } from '@heroicons/vue/20/solid'
import { ButtonType } from '@/types/button'
import { InputType } from '@/types/input'
import { useCityStore } from '@/stores/city'
import { useRouter } from 'vue-router'
import type { City } from '@/types/city'

const router = useRouter()

const citiesHeader = ref([
  { label: 'City Name', key: 'name' as keyof City }, //key value =  a country value key:name=name:Bucharest
  { label: 'Description', key: 'description' as keyof City },
  { label: 'Population', key: 'population' as keyof City },
])

const newCities = ref(initializeNewCities())

const isCreateModalOpen = ref(false)

function closeCreateCitiesModal() {
  isCreateModalOpen.value = false
  newCities.value = initializeNewCities()
}

// connect with backend

const cityStore = useCityStore()

console.log(cityStore)

async function addNewCity() {
  //validateData()
  cityStore.setIsLoading(true)
  await cityStore.addCities(newCities.value)
  closeCreateCitiesModal()
  cityStore.setIsLoading(false)
}

function initializeNewCities() {
  return {
    name: '',
    description: '',
    population: 0,
  }
}

function onCityTableRowClicked(id: number) {
  router.push(`/cities/${id}`)
}

onBeforeMount(async () => {
  await cityStore.getCities()
  console.log(cityStore.cities)
})
</script>
