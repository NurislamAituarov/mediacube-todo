<template>
  <li class="list-item">
    <div class="left">
      <MoveIcon class="handle" />
      <BaseCheckbox
        :id="item.id"
        :is-completed="item.isCompleted"
        @on-change-status="onChangeStatus"
      />
      <input
        ref="refInput"
        v-model="title"
        class="list-item__title"
        type="text"
        :class="{ ['change-title']: isCompleted, completed: item.isCompleted }"
        @blur="handleBlur"
      />
    </div>

    <div class="right">
      <PencelIcon @handle-click="onClick" />
      <DeleteIcon @handle-click="onRemoveTask(item.id)" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MoveIcon from '@/components/svg/MoveIcon.vue'
import DeleteIcon from '@/components/svg/DeleteIcon.vue'
import PencelIcon from '@/components/svg/PencelIcon.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { Task } from '~/types'
import { onChangeStatus, onRemoveTask, onEditTitle } from '~/modules/tasks'

interface Props {
  item: Task
}
const props = defineProps<Props>()
const title = ref(props.item.title)
const isCompleted = ref(false)
const refInput = ref()

function handleBlur() {
  isCompleted.value = false
  onEditTitle(props.item.id, title.value)
}

function onClick() {
  isCompleted.value = true
  refInput.value.focus()
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.right {
  display: flex;
  align-items: center;
  gap: 18px;
}
.right svg {
  cursor: pointer;
}

.list-item__title {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #202427;
  pointer-events: none;
  margin-left: 2px;
}
.change-title {
  pointer-events: auto;
}
.completed {
  color: #8f99a3;
}
.handle {
  cursor: pointer;
}
</style>
