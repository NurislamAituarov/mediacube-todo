<template>
  <li class="list-item">
    <div class="left">
      <MoveIcon />
      <BaseCheckbox
        :id="item.id"
        :active="item.completed"
        @on-change-status="onChangeStatus"
      />
      <input
        ref="refInput"
        v-model="title"
        class="list-item__title"
        type="text"
        :class="{ ['change-title']: activeChange, completed: item.completed }"
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
import { ITask } from '~/types'
import { onChangeStatus, onRemoveTask, onEditTitle } from '~/modules/tasks'

interface IProps {
  item: ITask
}
const props = defineProps<IProps>()
const title = ref(props.item.title)
const activeChange = ref(false)
const refInput = ref()

function handleBlur() {
  activeChange.value = false
  onEditTitle(props.item.id, title.value)
}

function onClick() {
  activeChange.value = true
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
}
.change-title {
  pointer-events: auto;
}
.completed {
  color: #8f99a3;
}
</style>