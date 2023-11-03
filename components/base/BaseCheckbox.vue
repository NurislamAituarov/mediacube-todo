<template>
  <label :for="id + ''" class="label" :class="{ checked: active }">
    <CompleteIcon v-if="active" />
    <input
      :id="id + ''"
      type="checkbox"
      class="checkbox"
      :checked="active"
      @change="$emit('on-change-status', id)"
    />
  </label>
</template>

<script setup lang="ts">
import CompleteIcon from '@/components/svg/CompleteIcon.vue'

interface IProps {
  active: boolean
  id: number
}

defineProps<IProps>()
defineEmits(['on-change-status'])
</script>

<style scoped>
.label {
  width: 16px;
  height: 16px;
  border: 1px solid #c7ccd1;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.checkbox {
  display: none;
}
.checked {
  background-color: #2578f4;
}
</style>