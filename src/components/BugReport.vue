<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BugReport } from '@/stores/bugStore'

const props = defineProps<{
  bug: Bug | null
}>()

const currentBug = ref(props.bug)

watch(
  () => props.bug,
  (newBug) => {
    currentBug.value = newBug
  },
)
</script>

<template>
  <div class="bug-report" v-if="currentBug">
    <h2>Bug Details</h2>

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
          <p><strong>Date:</strong>{{ new Date(step.timestamp).toLocaleString() }}</p>
          <p><strong>Description:</strong>{{ step.description }}</p>
          <p><strong>Findings</strong>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bug-report {
  display: flex;
  flex-direction: column;
}
</style>
