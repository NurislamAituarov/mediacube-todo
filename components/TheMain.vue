<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <TheIllustration />
        <FormCreate @on-created-task="onCreatedTask" />
      </div>

      <TheTasks
        v-if="tasks.length"
        :tasks="filterTasks"
        @on-change-status="onChangeStatus"
      />

      <div v-if="tasks.length" class="progress">
        <ProgressBox title="Completed" :tasks-filtered="completedTasks" />
        <ProgressBox
          title="To be finished"
          :tasks-filtered="implementationTasks"
        />
      </div>

      <TheControl
        :tasks="tasks"
        :active-list="activeList"
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
  implementationTasks,
  onChangeStatus,
  onCreatedTask,
  setTasks,
  tasks,
} from '@/modules/tasks'
import { getItem, setItem } from '~/store'
import { ITask } from '~/types'

onMounted(() => {
  getItem('tasks') && setTasks(getItem('tasks'))
})

// filtered tasks

const filterTasks = computed(() => {
  const filterCondition = activeList.value

  if (filterCondition === 'Active') {
    return tasks.value.filter((task) => !task.completed)
  }

  if (filterCondition === 'Completed') {
    return tasks.value.filter((task) => task.completed)
  }

  return tasks.value
})

// controller
const activeList = ref('All')
// функции для обновления списка задач и активного списка

function updateTasks(newTasks: ITask[]) {
  tasks.value = newTasks
  setItem('tasks', newTasks)
}

function updateActiveList(newActiveList: string) {
  activeList.value = newActiveList
}

function onSelect(value: string) {
  if (value === 'Check all') {
    const updatedTasks = tasks.value.map((task) => ({
      ...task,
      completed: true,
    }))
    updateTasks(updatedTasks)
    updateActiveList('All')
  } else if (value === 'Clear completed') {
    const updatedTasks = tasks.value.filter((task) => !task.completed)
    updateTasks(updatedTasks)
    updateActiveList('All')
  } else {
    updateActiveList(value)
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
