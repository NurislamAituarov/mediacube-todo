import { computed, ref } from 'vue'
import { keys } from '~/lib/constants'
import { setItem } from '~/store'
import { Task } from '~/types'

export const tasks = ref<Task[]>([])

export function setTasks(items: Task[]) {
  tasks.value = items
}

export function onTaskCreate(task: Task) {
  tasks.value.push(task)

  setItem(keys.tasks, tasks.value)
}

export function onChangeStatus(id: string) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted }
    }

    return task
  })

  setItem(keys.tasks, tasks.value)
}

export function onRemoveTask(id: string) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  setItem(keys.tasks, tasks.value)
}

export function onEditTitle(id: string, value: string) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, title: value }
    }

    return task
  })
  setItem(keys.tasks, tasks.value)
}

export const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.isCompleted)
})

export const incompleteTasks = computed(() => {
  return tasks.value.filter((task) => !task.isCompleted)
})
