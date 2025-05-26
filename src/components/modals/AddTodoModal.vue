<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

const { visible = false } = defineProps<{ visible: boolean }>()

const emit = defineEmits<{
  close: []
  submit: [value: string]
}>()

const todoTitle = ref('')
const titleInput = ref<HTMLInputElement>()

watch(() => visible, async (newVal) => {
  if (newVal) {
    todoTitle.value = ''
    await nextTick()
    titleInput.value?.focus()
  }
})

function submit(): void {
  if (!todoTitle.value.trim()) return
  emit('submit', todoTitle.value)
  closeModal()
}

function closeModal(): void {
  emit('close')
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-contents">
      <header class="modal-header">
        <h2>
          <slot name="header">Adding Your Todo</slot>
        </h2>
      </header>
      <section class="modal-body">
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="title">Task Name: </label>
            <br>
            <input id="title" ref="titleInput" v-model="todoTitle" type="text" required placeholder="study vue3..." />
          </div>
        </form>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="closeModal">close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.modal-contents {
  background: #2d3436;
  text-align: left;
  color: black;
  margin: 10% auto;
  padding: 30px;
  width: 30%;
  min-height: 30%;
  max-height: 80vh;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.modal-footer {
  text-align: right;
}
</style>
