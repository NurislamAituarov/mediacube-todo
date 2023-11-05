<template>
  <div class="control">
    <p v-if="!tasks.length" class="control__notice">
      <CheckSuccess />
      Congrat, you have no more tasks to do
    </p>

    <div
      v-else
      class="control__filter"
      :class="{
        'control__filter-left': classes === 'left',
        'control__filter-right': classes === 'right',
      }"
    >
      <BaseButton
        v-for="list of filteredControlLists"
        :key="list"
        :value="list"
        :class="{ 'active-filter': activeList === list }"
        @on-select="$emit('on-select', list)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CheckSuccess from './svg/CheckSuccess.vue'
import { controlLists } from '~/lib/contants'
import { completedTasks, implementationTasks } from '~/modules/tasks'
import { ITask } from '~/types'

interface IProps {
  tasks: ITask[]
  activeList: string
}

const props = defineProps<IProps>()
defineEmits(['on-select'])
const classes = ref('left')

const filteredControlLists = computed(() => {
  if (props.tasks.length === completedTasks.value.length) {
    return ['All', 'Clear completed']
  }
  if (props.tasks.length === implementationTasks.value.length) {
    return ['Check all', 'All']
  }

  return controlLists
})

watch(filteredControlLists, (value) => {
  if (value.length === 2) {
    if (value[0] === 'All') {
      classes.value = 'right'
    } else {
      classes.value = 'left'
    }
  } else {
    classes.value = ''
  }
})
</script>

<style scoped>
.control__notice {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  text-align: center;
  color: #8f99a3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.control__filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.control__filter-left {
  justify-content: flex-start;
  gap: 115px;
}
.control__filter-right {
  justify-content: flex-end;
  gap: 68px;
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

@media all and (max-width: 485px) {
  .control__filter {
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
