
<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <TheIllustration />
        <FormCreate @on-created-task="onCreatedTask" />
      </div>

      <TheTasks :tasks="tasks" @on-change-status="onChangeStatus" />

      <div class="control">
        <p v-if="!tasks.length" class="control__notice">
          Congrat, you have no more tasks to do
        </p>

        <div v-else class="control__filter">
          <BaseButton
            v-for="list of controlLists"
            :key="list"
            :value="list"
            :class="{ 'active-filter': activeList === list }"
            @on-select="onSelect(list)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import TheTasks from './tasks/TheTasks.vue'
import ITask from '~/types'

const controlLists = [
  'Check all',
  'All',
  'Active',
  'Completed',
  'Clear completed',
]

const tasks = ref<ITask[]>([])
const activeList = ref('All')

function onCreatedTask(task: ITask) {
  tasks.value.push(task)
}
function onSelect(value: string) {
  activeList.value = value
}

function onChangeStatus(id: number) {
  console.log(id)
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, status: !task.status }
    }

    return task
  })
}

provide('on-change-status', onChangeStatus)
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
.control {
}
.control__notice {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  text-align: center;
  color: #8f99a3;
}

.control__filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.control__filter button {
  padding: 8px 12px;
  background-color: white;
  color: #202427;

  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
}

.control__filter .active-filter {
  background-color: #2578f4;
  color: white;
}
</style>
