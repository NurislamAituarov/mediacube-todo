<template>
  <div class="progress__box">
    <p class="progress__number">{{ tasksFiltered.length }} tasks</p>
    <h2 class="progress__title">{{ title }}</h2>
    <div class="progress__line">
      <div
        class="progress__line-active"
        :class="{ 'progress__line-finished': title !== 'Completed' }"
        :style="{ width: activeProgressPercent }"
      ></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { tasks } from '~/modules/tasks'
import { ITask } from '~/types'

interface IProps {
  title: string
  tasksFiltered: ITask[]
}

const props = defineProps<IProps>()

const activeProgressPercent = computed(() => {
  const percent = (props.tasksFiltered.length * 100) / tasks.value.length

  return `${percent}%`
})
</script>

<style scoped>
.progress__box {
  width: 190px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2024270d;
  border-radius: 8px;
}
.progress__number {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 4px;
  color: rgba(43, 46, 48, 0.4);
}

.progress__title {
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  color: #202427;
}
.progress__line {
  height: 4px;
  background-color: #2024271a;
}

.progress__line-active {
  height: 100%;
  background-color: #5d5fef;
  transition: all 0.5s;
}

.progress__line-finished {
  background-color: #ef5da8;
}
</style>