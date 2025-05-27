import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

//export const TaskStatus = {
//  done: true,
//  working: false,
//} as const;
export type TaskStatus = "working" | "done";

interface BaseTodo {
  id: string;
  content: string;
  status: TaskStatus;
}

export interface Todo extends BaseTodo {
  readonly isCompleted: boolean;
}

const TodoList: BaseTodo[] = [];

export const appStore = defineStore("todo", {
  state: () => {
    return {
      id: "" as string,
      textInput: "" as string,
      todoList: TodoList,
      todo: null as BaseTodo | null,
    };
  },

  getters: {
    todos: (state): Todo[] => {
      return state.todoList.map((todo) => ({
        ...todo,
        isCompleted: todo.status === "done",
      }));
    },
    countTodos: (state) => state.todoList.length,
    countIncompleteTodos: (state) => {
      return state.todoList.filter((todo) => todo.status === "working").length;
    },
  },

  actions: {
    addTodo(todoContent: string): void {
      this.todoList.push({
        id: uuidv4(),
        content: todoContent,
        status: "working" as TaskStatus,
      });
    },
    removeDoneTodos(): void {
      this.todoList = this.todoList.filter(
        (item: BaseTodo) => item.status !== "done",
      );
    },
  },
});
