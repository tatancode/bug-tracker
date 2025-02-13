<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBugStore } from '@/stores/bugStore'

interface InvestigationStep {
  timestamp: string
  description: string
  findings: string
}

const emit = defineEmits<{
  (e: 'bug-saved'): void
  (e: 'form-submitted'): void
}>()

const store = useBugStore()

const bugTitle = ref('')
const bugDescription = ref('')
const stepsToReproduce = ref('')
const investigationSteps = ref<InvestigationStep[]>([])
const resolution = ref('')

const savedBugs = ref(store.bugs)

const addInvestigationStep = () => {
  investigationSteps.value.push({
    timestamp: new Date().toISOString(),
    description: '',
    findings: '',
  })
}

const removeStep = (index: number) => {
  investigationSteps.value.splice(index, 1)
}

const saveBug = () => {
  store.addBug({
    title: bugTitle.value,
    description: bugDescription.value,
    stepsToReproduce: stepsToReproduce.value,
    investigationSteps: investigationSteps.value,
    resolution: resolution.value,
  })

  // Clear form
  bugTitle.value = ''
  bugDescription.value = ''
  stepsToReproduce.value = ''
  investigationSteps.value = []
  resolution.value = ''

  // Emit event to notify parent
  emit('bug-saved')
  emit('form-submitted')
}

onMounted(() => {
  console.log('Component mounted, current bugs:', store.bugs)
})
</script>

<template>
  <div class="bug-investigation">
    <h1>Bug Investigation Tool</h1>

    <div class="section" v-if="savedBugs.length > 0">
      <h2>Saved Bug Reports</h2>
      <div v-for="bug in savedBugs" :key="bug.id" class="saved-bug">
        <h3>{{ bug.title }}</h3>
        <p>Created: {{ new Date(bug.createdAt).toLocaleString() }}</p>
      </div>
    </div>

    <div class="section">
      <h2>Bug Details</h2>
      <input v-model="bugTitle" placeholder="Bug Title" />
      <textarea v-model="bugDescription" placeholder="Describe the bug..."></textarea>
    </div>

    <div class="section">
      <h2>Steps to Reproduce</h2>
      <textarea v-model="stepsToReproduce" placeholder="List the steps to reproduce..."></textarea>
    </div>

    <div class="section">
      <h2>Investigation Steps</h2>
      <button @click="addInvestigationStep">Add Investigation Step</button>

      <div v-for="(step, index) in investigationSteps" :key="index" class="investigation-step">
        <div class="step-header">
          <span>Step {{ index + 1 }} - {{ new Date(step.timestamp).toLocaleString() }}</span>
          <button @click="removeStep(index)" class="remove-btn">Remove</button>
        </div>
        <textarea v-model="step.description" placeholder="What did you try?"></textarea>
        <textarea v-model="step.findings" placeholder="What did you find?"></textarea>
      </div>
    </div>

    <div class="section">
      <h2>Resolution</h2>
      <textarea v-model="resolution" placeholder="Describe the solution..."></textarea>
    </div>

    <div class="section">
      <button @click="saveBug" class="button">Save Bug Report</button>
    </div>
  </div>
</template>

<style scoped>
.bug-investigation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  margin: 8px 0;
  padding: 8px;
}

textarea {
  min-height: 100px;
}

.investigation-step {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.remove-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  opacity: 0.8;
}

.save-btn {
  background-color: #42b983;
  margin-top: 20px;
}

.saved-bug {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}
</style>
