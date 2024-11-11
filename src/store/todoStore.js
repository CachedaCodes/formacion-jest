import { defineStore } from 'pinia'
import addTodo from './actions/addTodo'
import toggleTodoCompletion from './actions/toggleCompletion'

export const useTodoStore = defineStore('todo', {
    state: () => ({ todos: [] }),
    actions: {
      addTodo,
      toggleTodoCompletion
    },
  })