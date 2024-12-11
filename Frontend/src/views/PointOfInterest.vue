<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex w-full items-center justify-between">
      <h1 class="text-2xl font-semibold">Point of interest</h1>
      <BaseButton
        :type="ButtonType.PRIMARY"
        text="Add Point of interest"
        @click="openCreatePointOfInterestModal"
      />
    </div>
    <BaseTable
      :headers="pointOfInterestHeader"
      :data="pointOfInterestStore.pointOfInterest"
      @on-row-click="onPoiTableRowClicked"
    />
  </div>

  <BaseModal
    :is-open="isCreatePointOfInterestModalOpen"
    :is-primary-button-disabled="pointOfInterestStore.isLoading"
    primary-button-text="Create"
    title="This is a modal title"
    description="Are you sure you want to edit this modal?"
    @on-close="closeCreatePointOfInterestModal"
    @on-action-click="addNewPointOfInterest"
  >
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10"
        >
          <component :is="SparklesIcon" class="size-6 text-cyan-600" aria-hidden="true" />
        </div>

        <div class="flex flex-col gap-y-8 w-[300px]">
          <h1 class="text-3xl font-semibold text-gray-900 font-serif ml-3">
            Adding Point of interest
          </h1>
          <div class="flex flex-col gap-y-4 font-serif">
            <BaseInput
              v-model="newPointOfInterest.name"
              :type="InputType.TEXT"
              label="Name"
              placeholder="Add point of interest name..."
            />
            <BaseInput
              v-model="newPointOfInterest.description"
              :type="InputType.TEXT"
              label="Description"
              placeholder="Add point of interest description..."
            />
            <BaseInput
              v-model="newPointOfInterest.googleMapsUrl"
              :type="InputType.TEXT"
              label="Url"
              placeholder="Add the Google Map Url of the point of interest..."
            />
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
import { ButtonType } from '@/types/button'
import { InputType } from '@/types/input'
import { onBeforeMount, ref } from 'vue'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { usePointOfInterestStore } from '@/stores/pointOfInterest'
import { useRouter } from 'vue-router'
import type { PointOfInterest } from '@/types/pointofinterest'

const router = useRouter()

const pointOfInterestHeader = ref([
  { label: 'Name', key: 'name' as keyof PointOfInterest }, //key value =  a country value key:name=name:Romania
  { label: 'Description', key: 'description' as keyof PointOfInterest },
  { label: 'Url', key: 'googleMapsUrl' as keyof PointOfInterest },
])

const newPointOfInterest = ref(initializeNewPointOfInterest())

const isCreatePointOfInterestModalOpen = ref(false)

function openCreatePointOfInterestModal() {
  isCreatePointOfInterestModalOpen.value = true
}

function closeCreatePointOfInterestModal() {
  isCreatePointOfInterestModalOpen.value = false
}

//

const pointOfInterestStore = usePointOfInterestStore()

async function addNewPointOfInterest() {
  //validateData()
  pointOfInterestStore.setIsLoading(true)
  await pointOfInterestStore.addPointOfInterest(newPointOfInterest.value)
  closeCreatePointOfInterestModal()
  pointOfInterestStore.setIsLoading(false)
}

function initializeNewPointOfInterest() {
  return {
    name: '',
    description: '',
    googleMapsUrl: '',
  }
}

function onPoiTableRowClicked(id: number) {
  router.push(`/pointOfInterest/${id}`)
}

onBeforeMount(async () => {
  console.log('onBefore meghivodik')
  await pointOfInterestStore.getPointOfInterest()
})
</script>
