import { ref } from 'vue'
import { ITask } from '~/types'

export const tasks = ref<ITask[]>([])

export function onCreatedTask(task: ITask) {
  tasks.value.push(task)
}

export function onChangeStatus(id: number) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed }
    }

    return task
  })
}

export function onRemoveTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

export function onChangeTitle(id: number, value: string) {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      return { ...task, title: value }
    }

    return task
  })
}
