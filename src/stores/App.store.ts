import { defineStore } from 'pinia';

interface Todo {
  content: string,
  isDone: boolean
};

export const appStore = defineStore('todo', {
  state: () => {
    return {
      textInput: '' as string,
      todoList: [] as Todo[],
      todo: null as Todo | null,
    }
  },

  getters: {
    todos: (state) => state.todoList,
    countTodos: (state) => state.todoList.length(),
  },

  actions: {
    addTodo(todoContent: strin): void {
      this.todoList.push({
        content: todoContent,
        isDone: false
      });
      console.log(this.todoList)
    },
  },
})

