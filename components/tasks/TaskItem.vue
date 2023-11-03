<template>
  <li class="list-item">
    <div class="left">
      <MoveIcon />
      <BaseCheckbox
        :id="item.id"
        :active="item.status"
        @on-change-status="onChangeStatus"
      />
      <p>{{ item.title }}</p>
    </div>

    <div class="right">
      <PencelIcon />
      <DeleteIcon />
    </div>
  </li>
</template>


<script setup lang="ts">
import { inject } from 'vue'
import MoveIcon from '@/components/svg/MoveIcon.vue'
import DeleteIcon from '@/components/svg/DeleteIcon.vue'
import PencelIcon from '@/components/svg/PencelIcon.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'

import { ITask } from '~/types'

interface IProps {
  item: ITask
}
defineProps<IProps>()

const onChangeStatus = inject('on-change-status') as any
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
</style>