import { computed, ref } from 'vue'
import { setItem } from '~/store'
import { ITask } from '~/types'

export const tasks = ref<ITask[]>([])

export function setTasks(items: ITask[]) {
  tasks.value = items
}

export function onCreatedTask(task: ITask) {
  tasks.value.push(task)

  setItem('tasks', tasks.value)
}

export function onChangeStatus(id: number) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed }
    }

    return task
  })

  setItem('tasks', tasks.value)
}

export function onRemoveTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  setItem('tasks', tasks.value)
}

export function onChangeTitle(id: number, value: string) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, title: value }
    }

    return task
  })
  setItem('tasks', tasks.value)
}

export const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.completed)
})

export const implementationTasks = computed(() => {
  return tasks.value.filter((task) => !task.completed)
})
