<template>
  <div>
    <Listbox v-model="selectedValue">
      <ListboxButton>{{ selectedValue?.name || placeholder }}</ListboxButton>
      <ListboxOptions>
        <ListboxOption v-for="item in items" :key="item.id" :value="item" :disabled="item.disabled">
          {{ item.name }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

// Props és eventek definiálása
defineProps({
  items: { type: Array, required: true },
  modelValue: { type: Object, default: null },
  placeholder: { type: String, default: 'Válassz egy opciót' },
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(null)

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
