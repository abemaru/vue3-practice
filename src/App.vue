<script setup lang="ts">
  import { appStore } from './stores/App.store.ts';

  const store = appStore()
</script>

<template>
  <h1>
    My ToDo App
  </h1>
  <input type="text" v-model="textInput"/>
  <button @click="store.addTodo(textInput)">
    add
  </button>
  <button>
    remove done
  </button> 
  <ul>
    <li v-for="item of store.todos">
      <input type="checkbox" id="checkbox" :v-model="item.isDone" />
      <label for="checkbox">
        {{item.content}}
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
