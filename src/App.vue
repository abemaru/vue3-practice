<script setup lang="ts">
// TODO: task-item:completedが効いてない:w
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
      <h1 class="app-title">
        My ToDo App
      </h1>
      <p class="tasks-counter">
        You Have <span class="tasks-count"> {{ tasksLeft }}</span> tasks to do !
      </p>
    </header>
    <main class="app-main">
      <section class="tasks-session">
        <h2 class="section-title">
          Your Tasks
        </h2>
        <ul id="task-list" v-if="store.todos.length > 0">
          <div class="task-content">
            <li v-for="item of store.todos" class="task-item" :class="{ 'completed': item.status }">
              <input type="checkbox" v-model="item.status" />
              <label for="checkbox">
                {{ item.content }}
              </label>
            </li>
          </div>
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
.todo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
  color: #9a9a9a;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #9a9a9a;
  margin: 0 0 1rem 0;
  background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tasks-counter {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.tasks-count {
  font-weight: 600;
  color: #667eea;
  font-size: 1.2em;
}

.app-main {
  display: grid;
  gap: 2.5em;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-item {
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item:completed {
  opacity: 0.7;
  text-decoration: line-through;
}

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
