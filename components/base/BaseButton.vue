<template>
  <button class="btn" @click="$emit('on-select')">
    {{ value }}
  </button>
</template>

<script setup lang="ts">
interface IProps {
  value: string
}
defineProps<IProps>()
defineEmits(['on-select', 'on-click'])
</script>

<style scoped>
.btn {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #2578f4;
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.4s;
}

.btn:active {
  background-color: #2578f4;
  color: white;
  opacity: 0.5;
}
</style>
