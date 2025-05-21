import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

const TaskStatus = {
  done: true,
  working: false,
} as const;

type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

interface Todo {
  id: string;
  content: string;
  status: TaskStatus;
}

const TodoList: Todo[] = [];

export const appStore = defineStore("todo", {
  state: () => {
    return {
      id: "" as string,
      textInput: "" as string,
      todoList: TodoList,
      todo: null as Todo | null,
    };
  },

  getters: {
    todos: (state) => state.todoList,
    countTodos: (state) => state.todoList.length,
  },

  actions: {
    addTodo(todoContent: string): void {
      this.todoList.push({
        id: uuidv4(),
        content: todoContent,
        status: TaskStatus.working,
      });
    },
    removeDoneTodos(): void {
      this.todoList = this.todoList.filter(
        (item: Todo) => item.status === TaskStatus.working,
      );
    },
  },
});
