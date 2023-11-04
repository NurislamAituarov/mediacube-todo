
<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <TheIllustration />
        <FormCreate @on-created-task="onCreatedTask" />
      </div>

      <TheTasks :tasks="filterTasks" @on-change-status="onChangeStatus" />

      <TheControl
        :tasks="tasks"
        :active-list="activeList"
        @on-select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TheTasks from './tasks/TheTasks.vue'
import TheControl from './TheControl.vue'
import { onChangeStatus, onCreatedTask, tasks } from '@/modules/tasks'

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

function onSelect(value: string) {
  if (value === 'Check all') {
    tasks.value = tasks.value.map((task) => ({ ...task, completed: true }))
  } else if (value === 'Clear completed') {
    tasks.value = tasks.value.filter((task) => !task.completed)
  } else {
    activeList.value = value
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
</style>
