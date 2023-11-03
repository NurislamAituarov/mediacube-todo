
<template>
  <div class="tasks">
    <ul>
      <TaskItem v-for="task of tasks" :key="task.id" :item="task" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import { ITask } from '~/types'

interface IProps {
  tasks: ITask[]
}

defineProps<IProps>()
</script>

<style scoped>
.tasks {
  width: 444px;
  height: 85px;
  margin: 0 auto;
  overflow-y: auto;
  padding-right: 16px;
}
</style>