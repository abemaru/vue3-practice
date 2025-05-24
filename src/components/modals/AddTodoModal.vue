<script setup lang="ts">
import { ref, watch } from 'vue';

const { visible = false } = defineProps<{ visible: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', value: string): void
}>()

const todoTitle = ref('')

watch(() => visible, (newVal) => {
  if (newVal) {
    todoTitle.value = ''
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
            <label for="title">Task Name</label>
            <input id="title" v-model="todoTitle" type="text" required placeholder="study vue3..." />
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
}

.modal-contents {
  background: white;
  margin: 10% auto;
  padding: 20px;
  width: 40%;
  height: 40%;
  border-radius: 10px;
}

.modal-header {
  color: black;
}

.modal-footer {
  text-align: right;
}
</style>
