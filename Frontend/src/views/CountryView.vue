<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex w-full items-center justify-between">
      <h1 class="text-2xl font-semibold">Countries</h1>
      <BaseButton :type="ButtonType.PRIMARY" text="Add Country" @click="openCreateCountryModal" />
    </div>
    <BaseTable
      :headers="countryHeader"
      :data="countryStore.country"
      @on-row-click="onCountryTableRowClicked"
    />
  </div>

  <BaseModal
    :is-open="isCreateCountryModalOpen"
    :is-primary-button-disabled="countryStore.isLoading"
    primary-button-text="Create"
    title="This is a modal title"
    description="Are you sure you want to edit this modal?"
    @on-close="closeCreateCountryModal"
    @on-action-click="addNewCountry"
  >
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10"
        >
          <component :is="GlobeAltIcon" class="size-6 text-cyan-600" aria-hidden="true" />
        </div>

        <div class="flex flex-col gap-y-8 w-[300px]">
          <h1 class="text-3xl font-semibold text-gray-900 font-serif ml-3">Adding Country</h1>
          <div class="flex flex-col gap-y-4 font-serif">
            <BaseInput
              v-model="newCountry.name"
              :type="InputType.TEXT"
              label="Name"
              placeholder="Add country name..."
            />
            <BaseInput
              v-model="newCountry.description"
              :type="InputType.TEXT"
              label="Description"
              placeholder="Add country description..."
            />
            <BaseInput
              v-model="newCountry.latitude"
              :type="InputType.NUMBER"
              label="Latitude"
              placeholder="Add latitude of the country..."
            />
            <BaseInput
              v-model="newCountry.longitude"
              :type="InputType.NUMBER"
              label="Longitude"
              placeholder="Add longitude of the country..."
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
import { ButtonType } from '@/types/button'
import { InputType } from '@/types/input'
import { GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useCountryStore } from '@/stores/country'
import { useRouter } from 'vue-router'
import type { Country } from '@/types/country'

const router = useRouter()

const countryStore = useCountryStore()

const countryHeader = ref([
  { label: 'Country Name', key: 'name' as keyof Country }, //key value =  a country value key:name=name:Romania
  { label: 'Description', key: 'description' as keyof Country },
  { label: 'Latitude', key: 'latitude' as keyof Country },
  { label: 'Longitude', key: 'longitude' as keyof Country },
])

const newCountry = ref(initializeNewCountry())

const isCreateCountryModalOpen = ref(false)

function initializeNewCountry() {
  return {
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
  }
}

function openCreateCountryModal() {
  isCreateCountryModalOpen.value = true
}

function closeCreateCountryModal() {
  isCreateCountryModalOpen.value = false
}

//connect with Backend

async function addNewCountry() {
  countryStore.setIsLoading(true)
  await countryStore.addCountry(newCountry.value)
  closeCreateCountryModal()
  countryStore.setIsLoading(false)
}

function onCountryTableRowClicked(id: number) {
  router.push(`/country/${id}`)
}

onBeforeMount(async () => {
  await countryStore.getCountry()
})
</script>
