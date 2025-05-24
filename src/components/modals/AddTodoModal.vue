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
      <header>
        <slot name="header">Add Your Todo</slot>
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
