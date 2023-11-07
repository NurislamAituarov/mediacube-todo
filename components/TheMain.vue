<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <TheIllustration />
        <FormCreate @on-task-create="onTaskCreate" />
      </div>

      <TheTasks
        v-if="tasks.length"
        :tasks="filteredTasks"
        @on-change-status="onChangeStatus"
      />

      <div v-if="tasks.length" class="progress">
        <ProgressBox title="Completed" :tasks-filtered="completedTasks" />
        <ProgressBox title="To be finished" :tasks-filtered="incompleteTasks" />
      </div>

      <TheControl
        :tasks="tasks"
        :active-field="activeField"
        @on-select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TheControl from './TheControl.vue'
import TheTasks from './tasks/TheTasks.vue'
import ProgressBox from './ProgressBox.vue'
import {
  completedTasks,
  incompleteTasks,
  onChangeStatus,
  onTaskCreate,
  setTasks,
  tasks,
} from '@/modules/tasks'
import { getItem, setItem } from '~/store'
import { Task } from '~/types'
import { keys } from '~/lib/constants'

onMounted(() => {
  const tasks = getItem('tasks')
  if (tasks) setTasks(tasks)
})

// filtered tasks

const filteredTasks = computed(() => {
  const selectedField = activeField.value

  if (selectedField === 'Active') {
    return tasks.value.filter((task) => !task.isCompleted)
  }

  if (selectedField === 'Completed') {
    return tasks.value.filter((task) => task.isCompleted)
  }

  return tasks.value
})

// controller
const activeField = ref('All')
// функции для обновления списка задач и активного списка

function updateTasks(updatedTasks: Task[]) {
  tasks.value = updatedTasks
  setItem(keys.tasks, updatedTasks)
}

function updateActiveField(updatedField: string) {
  activeField.value = updatedField
}

function onSelect(value: string) {
  if (value === 'Check all') {
    const updatedTasks = tasks.value.map((task) => ({
      ...task,
      isCompleted: true,
    }))
    updateTasks(updatedTasks)
    updateActiveField('All')
  } else if (value === 'Clear completed') {
    const updatedTasks = tasks.value.filter((task) => !task.isCompleted)
    updateTasks(updatedTasks)
    updateActiveField('All')
  } else {
    updateActiveField(value)
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 730px;
  min-height: 719px;
  background-color: #ffffff;
  border-radius: 24px;
  margin: 90px auto;
  padding: 32px;
}
.container {
  width: 428px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 719px;
}
.progress {
  max-width: 410px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

@media all and (max-width: 485px) {
  .wrapper {
    margin: 0px auto;
    border-radius: 0;
    padding: 18px;
    overflow-x: hidden;
  }
  .container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    gap: 20px;
  }
  .progress {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
