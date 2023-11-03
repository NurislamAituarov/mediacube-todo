import { ITask } from '~/types'

interface IState {
  tasks: ITask[]
}

export const state: IState = {
  tasks: [],
}

export const getters = {
  getCounter(state: IState) {
    return state.tasks
  },
}

export const mutations = {
  createTask(state: IState, task: ITask) {
    state.tasks.push(task)
  },
}

export const actions = {
  createTask({ commit }: any, task: ITask) {
    commit('createTask', task)
  },
}
