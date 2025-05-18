import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  content: string;
  isDone: boolean;
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
        // TODO: ここをfalseにしていることに気づかずupdateTodoStatusで反転していた
        // タスクを作るときは定数かなにかでTaskUnDone = false、完了にするときは TaskDone = trueみたいにしたほうがいいかも？
        isDone: false,
      });
    },
    removeDoneTodos(): void {
      this.todoList = this.todoList.filter((t: Todo) => {
        return t.isDone;
      });
      console.log(this.todoList);
    },
    updateTodoStatus(itemId: string): void {
      const idx = this.todoList.findIndex((item: Todo) => item.id === itemId);
      if (idx !== -1) {
        this.todoList[idx].isDone = !this.todoList[idx].isDone;
      }
      console.log(this.todoList);
    },
  },
});
