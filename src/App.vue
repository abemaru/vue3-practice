<script setup lang="ts">
import { ref, computed } from 'vue'
import { appStore } from './stores/App.store.ts'
import AddTodoModal from './components/modals/AddTodoModal.vue'

const store = appStore()

const showModal = ref(false)
const tasksLeft = computed(() => store.countTodos)

function handleAddTodo(todoContent: string): void {
  store.addTodo(todoContent)
  showModal.value = false
}
</script>

<template>
  <div class="todo-app">
    <header class="app-header">
      <h1>
        My ToDo App
      </h1>
      <p>
        You Have {{ tasksLeft }} tasks to do !
      </p>
    </header>
    <main class="app-main">
      <section class="tasks-session">
        <h2>
          Your Tasks
        </h2>
        <ul id="task-list" v-if="store.todos.length > 0">
          <li v-for="item of store.todos">
            <input type="checkbox" v-model="item.status" />
            <label for="checkbox">
              {{ item.content }}
            </label>
          </li>
        </ul>
        <div v-else>
          <p>Add your first task and start working!</p>
        </div>
      </section>
      <section class="action-section">
        <h2>
          Add Tasks
        </h2>
        <button @click="showModal = true">
          open modal
        </button>
        <button @click="store.removeDoneTodos()">
          remove done
        </button>
      </section>
    </main>
    <AddTodoModal :visible="showModal" @close="showModal = false" @submit="handleAddTodo" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
