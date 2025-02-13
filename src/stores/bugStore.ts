import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface InvestigationStep {
  timestamp: string
  description: string
  findings: string
}

export interface Bug {
  id: string
  title: string
  description: string
  stepsToReproduce: string
  status: string
  investigationSteps: InvestigationStep[]
  resolution: string
  createdAt: string
  updatedAt: string
}

export const useBugStore = defineStore('bugs', () => {
  const bugs = ref<Bug[]>([])

  // Load initial data from localStorage
  const initializeStore = () => {
    const stored = localStorage.getItem('bug-reports')
    console.log('Initializing store, stored data:', stored)
    if (stored) {
      bugs.value = JSON.parse(stored)
    }
  }

  // Watch for changes and save to localStorage
  watch(
    bugs,
    (newBugs) => {
      console.log('Saving bugs to localStorage:', newBugs)
      localStorage.setItem('bug-reports', JSON.stringify(newBugs))
    },
    { deep: true },
  )

  // Store actions
  const addBug = (bug: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Adding new bug:', bug)
    const newBug: Bug = {
      ...bug,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    bugs.value.push(newBug)
  }

  const updateBug = (id: string, updates: Partial<Bug>) => {
    const index = bugs.value.findIndex((bug) => bug.id === id)
    if (index !== -1) {
      bugs.value[index] = {
        ...bugs.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
    }
  }

  const deleteBug = (id: string) => {
    bugs.value = bugs.value.filter((bug) => bug.id !== id)
  }

  // Initialize store
  initializeStore()

  return {
    bugs,
    addBug,
    updateBug,
    deleteBug,
  }
})
