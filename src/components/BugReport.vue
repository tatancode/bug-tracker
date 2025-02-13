<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Bug } from '@/stores/bugStore'
import { useBugStore } from '@/stores/bugStore'

const props = defineProps<{
  bug: Bug | null
}>()

const emit = defineEmits<{
  (e: 'bug-deleted'): void
}>()

const store = useBugStore()
const currentBug = ref(props.bug)
const showDeleteModal = ref(false)

watch(
  () => props.bug,
  (newBug) => {
    currentBug.value = newBug
  },
)

const handleDelete = () => {
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (currentBug.value) {
    store.deleteBug(currentBug.value.id)
    showDeleteModal.value = false
    currentBug.value = null
    emit('bug-deleted')
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
}
</script>

<template>
  <div class="bug-report" v-if="currentBug">
    <div class="bug-header">
      <h2>Bug Details</h2>
      <button class="delete-btn" @click="handleDelete">Delete Bug</button>
    </div>

    <div class="bug-info">
      <h3>{{ currentBug.title }}</h3>

      <div class="info-section">
        <h4>Description</h4>
        <p>{{ currentBug.description }}</p>
      </div>

      <div class="info-section">
        <h4>Investigation Steps</h4>
        <div
          v-for="(step, index) in currentBug.investigationSteps"
          :key="index"
          class="investigation-step"
        >
          <p><strong>Date: </strong>{{ new Date(step.timestamp).toLocaleString() }}</p>
          <p><strong>Description: </strong>{{ step.description }}</p>
          <p><strong>Findings: </strong>{{ step.findings }}</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this bug report?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="cancelDelete">Cancel</button>
          <button class="confirm-delete-btn" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bug-report {
  display: flex;
  flex-direction: column;
  position: relative;
}

.bug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal h3 {
  margin-top: 0;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.confirm-delete-btn:hover {
  background-color: #c82333;
}

.info-section {
  margin-bottom: 20px;
}

.investigation-step {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.investigation-step p {
  margin: 5px 0;
}
</style>
