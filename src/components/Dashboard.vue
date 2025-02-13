<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBugStore } from '@/stores/bugStore'
import BugReport from './BugReport.vue'
import BugForm from './BugForm.vue'
import type { Bug } from '@/stores/bugStore'

const store = useBugStore()
const savedBugs = ref<Bug[]>(store.bugs)
const selectedBug = ref<Bug | null>(null)
const showBugForm = ref(false)
const showCreateButton = ref(true)

function handleBugClick(bug: Bug) {
  selectedBug.value = bug
  showBugForm.value = false
}

function handleCreateBugClick() {
  showBugForm.value = true
  selectedBug.value = null
  showCreateButton.value = false
  console.log('Clicking Create!!')
}

onMounted(() => {
  console.log('Component mounted, current bugs:', store.bugs)
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <div class="section" v-if="savedBugs.length == 0" id="no-bugs">
      <p>There are no bugs yet! Go find some and create a report below</p>
    </div>

    <div class="section" v-if="savedBugs.length > 0" id="bugs">
      <h2>Bug Reports</h2>
      <div
        v-for="bug in savedBugs"
        :key="bug.id"
        :class="{ selected: selectedBug?.id === bug.id }"
        class="saved-bug"
        @click="handleBugClick(bug)"
      >
        <h3>{{ bug.title }}</h3>
      </div>
    </div>

    <div v-if="!showBugForm" class="bug-details">
      <BugReport :bug="selectedBug" />
    </div>

    <div v-else class="bug-form">
      <BugForm @bug-saved="showBugForm = false" />
    </div>

    <div v-if="showCreateButton" class="section" id="create-bug">
      <h2>Create a Bug Report</h2>
      <button @click="handleCreateBugClick">Create</button>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
}

.section {
  padding-top: 16px;
  padding-bottom: 16px;
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
