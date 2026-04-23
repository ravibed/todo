<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
    <TodoHeader />

    <section class="p-4 sm:p-6 grid gap-5 max-w-[1400px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5">
        <TodoInput @add="addTask" />
        <TodoStats 
          :todo-count="todo.length"
          :progress-count="progress.length"
          :done-count="done.length"
        />
      </div>

      <TodoList
        :todo="todo"
        :progress="progress"
        :done="done"
        :drag-over-column="dragOverColumn"
        @move="moveTask"
        @delete="deleteTask"
        @edit="editTask"
        @clear-done="clearDone"
        @drag-start="onDragStart"
        @drag-over="onDragOver"
        @drag-leave="onDragLeave"
        @drag-end="onDragEnd"
        @drop="onDrop"
      />
    </section>
  </div>
</template>

<script setup>
const STORAGE_KEY = 'workspace-board-tasks'

const tasks = ref([])
const dragged = ref(null)
const dragOverColumn = ref(null)

// Load from localStorage
onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) tasks.value = JSON.parse(saved)
  } catch (error) {
    console.error('Failed to load tasks:', error)
    tasks.value = []
  }
})

// Auto-save to localStorage
watch(tasks, (newTasks) => {
  if (import.meta.client) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    } catch (error) {
      console.error('Failed to save tasks:', error)
    }
  }
}, { deep: true })

// ============================================
// TASK ACTIONS
// ============================================

const addTask = ({ text, assignee }) => {
  if (!text.trim()) return
  tasks.value.unshift({
    id: Date.now(),
    text: text.trim(),
    assignee: assignee || 'Unassigned',
    status: 'todo',
    createdAt: new Date().toISOString()
  })
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

const editTask = (id, updates) => {
  const task = tasks.value.find(t => t.id === id)
  if (!task) return
  if (updates.text !== undefined && updates.text.trim()) {
    task.text = updates.text.trim()
  }
  if (updates.assignee !== undefined) {
    task.assignee = updates.assignee.trim() || 'Unassigned'
  }
}

const moveTask = (id, status) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.status = status
}

const clearDone = () => {
  tasks.value = tasks.value.filter(t => t.status !== 'done')
}

// ============================================
// DRAG & DROP
// ============================================

const onDragStart = (task) => { dragged.value = task }
const onDragOver = (status) => { dragOverColumn.value = status }
const onDragLeave = (status) => {
  if (dragOverColumn.value === status) dragOverColumn.value = null
}
const onDragEnd = () => {
  dragged.value = null
  dragOverColumn.value = null
}
const onDrop = (status) => {
  if (dragged.value) dragged.value.status = status
  dragged.value = null
  dragOverColumn.value = null
}

// ============================================
// COMPUTED
// ============================================

const todo = computed(() => tasks.value.filter(t => t.status === 'todo'))
const progress = computed(() => tasks.value.filter(t => t.status === 'progress'))
const done = computed(() => tasks.value.filter(t => t.status === 'done'))
</script>