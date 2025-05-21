<script setup lang="ts">
import { computed } from 'vue';
import { appStore } from './stores/App.store.ts';

const store = appStore()

// 画面表示
const tasksLeft = computed(() => store.countTodos)
let textInput = '' as string;
</script>

<template>
  <h1>
    My ToDo App
  </h1>
  <p>
    You Have {{ tasksLeft }} tasks to do !
  </p>
  <input type="text" v-model="textInput" />
  <button @click="store.addTodo(textInput)">
    add
  </button>
  <button @click="store.removeDoneTodos()">
    remove done
  </button>
  <ul>
    <li v-for="item of store.todos">
      <input type="checkbox" v-model="item.status" />
      <label for="checkbox">
        {{ item.content }}
      </label>
    </li>
  </ul>
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
