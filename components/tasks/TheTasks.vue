<template>
  <div class="tasks">
    <draggable
      tag="ul"
      class="list-group"
      handle=".handle"
      :list="tasks"
      v-bind="dragOptions"
      @end="isDragging"
    >
      <transition-group type="transition" name="flip-list">
        <TaskItem v-for="task of tasks" :key="task.id" :item="task" />
      </transition-group>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import TaskItem from './TaskItem.vue'
import { ITask } from '~/types'
import { setItem } from '~/store'

interface IProps {
  tasks: ITask[]
}

const props = defineProps<IProps>()

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  }
})

function isDragging() {
  setItem('tasks', props.tasks)
}
</script>

<style scoped>
.tasks {
  width: 444px;
  height: 85px;
  margin: 0 auto;
  overflow-y: auto;
  padding-right: 16px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  /* background: #c8ebfb; */
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
